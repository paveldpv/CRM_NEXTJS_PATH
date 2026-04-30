'use client'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { useParams, usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { TPaginationPanel } from '../model/Type'
import { FetchOrder } from '@/shared/api'

const ITEMS_PER_PAGE = 20

export default function PaginationPanel({ setLoader, setDataOrder, totalOrder: initialTotalOrders }: TPaginationPanel) {
	const params = useParams()
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const INN = params!.INN as string
	const completed = searchParams!.get('completed') === 'true'
	const deleted = searchParams!.get('deleted') === 'true'
	const pageParam = searchParams!.get('page')
	const currentPage = pageParam ? parseInt(pageParam, 10) : 1

	const [totalOrders, setTotalOrders] = useState(initialTotalOrders || 0)
	const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE)

	// ✅ Загружаем общее количество заказов при смене фильтров
	useEffect(() => {
		const loadTotalOrders = async () => {
			setLoader(true)
			const total = await FetchOrder.getAmountOrder(INN, { completed, deleted })
			setTotalOrders(total)
			setLoader(false)
		}
		loadTotalOrders()
	}, [completed, deleted, INN, setLoader])

	// ✅ Сбрасываем на первую страницу, если currentPage > max
	useEffect(() => {
		const maxPage = Math.ceil(totalOrders / ITEMS_PER_PAGE)
		if (currentPage > maxPage && maxPage > 0) {
			const params = new URLSearchParams(searchParams!.toString())
			params.set('page', '1')
			router.push(`${pathname}?${params.toString()}`)
		}
	}, [totalOrders, currentPage, router, pathname, searchParams])

	// ✅ Загружаем страницу по изменению page в URL
	useEffect(() => {
		const loadPageOrders = async () => {
			setLoader(true)
			const offset = (currentPage - 1) * ITEMS_PER_PAGE

			const orders = await FetchOrder.getOrders({
				INN,
				completed,
				deleted,
				option: {
					pagination: { offset, limit: ITEMS_PER_PAGE },
				},
			})

			setDataOrder(orders)
			setLoader(false)
		}

		// Загружаем только если page задан (первая страница загружается родителем)
		if (pageParam && pageParam !== '1') {
			loadPageOrders()
		} else if (pageParam === '1') {
			// Можно опционально перезагрузить первую страницу
			loadPageOrders()
		}
	}, [currentPage, pageParam, completed, deleted, INN, setLoader, setDataOrder])

	// ✅ Навигация (обновляет URL)
	const nextPage = () => {
		if (currentPage < totalPages) {
			const params = new URLSearchParams(searchParams!.toString())
			params.set('page', (currentPage + 1).toString())
			router.push(`${pathname}?${params.toString()}`)
		}
	}

	const prevPage = () => {
		if (currentPage > 1) {
			const params = new URLSearchParams(searchParams!.toString())
			params.set('page', (currentPage - 1).toString())
			router.push(`${pathname}?${params.toString()}`)
		}
	}

	if (totalOrders <= ITEMS_PER_PAGE) return null

	return (
		<nav className='flex justify-center row-span-1'>
			<CusButton onClick={prevPage}>
				<FaAngleLeft />
			</CusButton>
			<span className='text-sm px-4'>
				Страница {currentPage} из {totalPages}
				<br />
				<span className=' text-sm'>Всего заказов: {totalOrders}</span>
			</span>
			<CusButton onClick={nextPage}>
				<FaAngleRight />
			</CusButton>
		</nav>
	)
}