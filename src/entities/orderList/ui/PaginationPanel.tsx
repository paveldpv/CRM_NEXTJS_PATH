'use client'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { TPaginationPanel } from '../model/Type'
import { FetchOrder } from '@/shared/api'
import router from 'next/router'

const ITEMS_PER_PAGE = 20

export default function PaginationPanel({ setLoader, setDataOrder, totalOrder : initialTotalOrders  }: TPaginationPanel) {
	
	const params = useParams()
	const searchParams = useSearchParams()

	const [totalOrders, setTotalOrders] = useState(initialTotalOrders || 0)
  const [currentPage, setCurrentPage] = useState(1)

	const INN = params!.INN as string
	const completed = searchParams!.get('completed') === 'true'
	const deleted = searchParams!.get('deleted') === 'true'
	const pathname = usePathname()

	 useEffect(() => {
    const loadTotalOrders = async () => {
      
        const total = await FetchOrder.getAmountOrder(INN, { completed, deleted })
        
        setTotalOrders(total)
        
        // Если добавили новый заказ и появилась новая страница
        const newTotalPages = Math.ceil(total / ITEMS_PER_PAGE)
        const oldTotalPages = Math.ceil(initialTotalOrders / ITEMS_PER_PAGE)
        
        // Если появилась новая страница и мы на последней - переходим на нее
        if (newTotalPages > oldTotalPages && currentPage === oldTotalPages) {
          setCurrentPage(newTotalPages)
        }
        setLoader(false)
     
    }    
    loadTotalOrders()
  }, [completed, deleted, INN, initialTotalOrders, currentPage])
	
	useEffect(() => {
		const loadPageOrders = async () => {
			setLoader(true)
			
				const offset = (currentPage - 1) * ITEMS_PER_PAGE

				const orders = await FetchOrder.getOrders(INN, deleted, completed, {
					pagination: {
						offset,
						limit: ITEMS_PER_PAGE,
					},
				})

				setDataOrder(orders)

				// Обновляем URL с номером страницы
				const params = new URLSearchParams(searchParams!.toString())
				params.set('page', currentPage.toString())
				router.replace(`${pathname}?${params.toString()}`)
			setLoader(false)
			
		}

		// Загружаем только если не первая страница (первая уже загружена родителем)
		if (currentPage > 1) {
			loadPageOrders()
		}
	}, [currentPage, completed, deleted, INN])


	const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE)

	const nextPage = async () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1)
		}
	}

	const prevPage = async () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1)
		}
	}

	if (totalOrders <= ITEMS_PER_PAGE) {
		return null
	}

	return (
		<nav className=' flex  justify-center row-span-1'>
			<CusButton onClick={prevPage}>
				<FaAngleLeft />
			</CusButton>
			<span className='text-sm'>
				Страница {currentPage} из {totalPages}
				<br />
				<small>Всего заказов: {totalOrders.toString()}</small>
			</span>
			<CusButton onClick={nextPage}>
				<FaAngleRight />
			</CusButton>
		</nav>
	)
}
