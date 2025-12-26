'use client'
import ContextMenu from '@/shared/components/contextMenu/ui/ContextMenu'
import useGeo from '@/shared/model/hooks/useGeo'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { typeDialog } from '@/shared/model/types/subtypes/enums'
import { PURPOSE_USE } from '@/shared/model/types/subtypes/TGeoLocation'
import { TLink } from '@/shared/model/types/subtypes/Types'
import CusButton from '@/shared/ui/CusButton'
import { useDialogWindow } from '@/shared/ui/dialogWindow/model/storeDialogWindow'
import { useFieldDialog } from '@/shared/ui/FieldDialog/model/storeFiledDialog'
import ListLinks from '@/shared/ui/listLInks/ui/ListLinks'
import { useLoader } from '@/shared/ui/namedLoader/model/storeLoader'
import NavLink from '@/shared/ui/navLink/ui/NavLink'
import { useParams, useRouter } from 'next/navigation'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { fetchAddNewPrice } from '../api/addNewPrice'
import { fetchGetListPrice } from '../api/getListPrice'
import { fetchRemovePrice } from '../api/removePrice'
import { fetchRenamePrice } from '../api/renamePrice'

function ListPrices({ INN, listLinks }: { INN: string; listLinks: TLink[] }) {
	const params = useParams() as { INN: string; PHONE: string; idTable: string }
	const setOpenFieldDialog = useFieldDialog((state) => state.setOpen)
	const [setOpenDialogWindow, dispatchFn] = useDialogWindow((state) => [
		state.setOpen,
		state.setDispatchFn,
	])
	const setVisibleLoader = useLoader((state) => state.setVisibleLoader)
	const { idUser } = useInfoUser((state) => state.dataUser)
	const { dataGeo } = useGeo(idUser, PURPOSE_USE.redact)
	const { push } = useRouter()
	const [listPrices, setListPrices] = useState(listLinks)

	useEffect(() => {
		setVisibleLoader(true)
		fetchGetListPrice(INN).then((res) => {
			if (!res) return
			setListPrices(res)
		})
	}, [])

	if (listLinks?.length > 10) {
		return <ListLinks listLinks={listLinks} className=' flex-row flex gap-1' />
	}

	const renamePrice = useCallback(
		async (newName?: string) => {
			if (!newName) return
			setVisibleLoader(true)
			await fetchRenamePrice(INN, newName, params.idTable, dataGeo)
			const updateDataListPrices = await fetchGetListPrice(INN)

			setListPrices(updateDataListPrices!)
			setOpenFieldDialog(false)
			setVisibleLoader(false)
		},
		[listLinks]
	)

	const removePrice = useCallback(async () => {
		setOpenDialogWindow(true, { title: 'удалить прайс' }, typeDialog.dialog)
		dispatchFn(async () => {
			setVisibleLoader(true)
			const { idTable } = params
			await fetchRemovePrice(INN, idTable, dataGeo)
			const updateDataListPrices = await fetchGetListPrice(INN)
			setListPrices(updateDataListPrices!)
			setVisibleLoader(false)
			push(`/${params.INN}/${params.PHONE}/main/price/initialPrice`)
		})
	}, [listLinks])

	const dataContextMenu: TItemMenu[] = useMemo(() => {
		const { idTable } = params
		if (idTable === 'initialPrice') {
			return [
				{
					title: 'Переименовать',
					onClickFunc: () => {
						setOpenFieldDialog({
							state: true,
							dispatchFn: renamePrice,
							dataDialog: { title: 'новое название' },
						})
					},
				},
			]
		}
		return [
			{
				title: 'Переименовать',
				onClickFunc: () => {
					setOpenFieldDialog({
						state: true,
						dispatchFn: renamePrice,
						dataDialog: { title: 'новое название' },
					})
				},
			},
			{ title: 'Удалить прайс', onClickFunc: removePrice },
		]
	}, [listLinks])

	const submitNewPrice = async (nameNewPrice?: string) => {
		if (!nameNewPrice) return
		setVisibleLoader(true)
		const addNewPrice = await fetchAddNewPrice(INN, nameNewPrice, dataGeo!)
		setOpenFieldDialog(false)
		const updateDataListPrices = await fetchGetListPrice(INN)
		setListPrices(updateDataListPrices!)
		setVisibleLoader(false)
		push(`/${params.INN}/${params.PHONE}/main/price/${addNewPrice}`)
	}

	return (
		<div className='flex items-center gap-2 border-b-2 mb-4 pb-2'>
			<nav className='flex gap-2'>
				{listPrices.map((link, index) => {
					const currentPagePrice = new RegExp(params.idTable).test(link.href)
					return (
						<div className=' flex' key={index}>
							<NavLink
								href={link.href}
								id={link.id}
								title={link.title}
								className={currentPagePrice ? ' border-r-0 rounded-r-none' : ''}
							/>
							{currentPagePrice && (
								<ContextMenu
									hidden={false}
									itemsMenu={dataContextMenu}
									className='rounded-l-none bg-color_header border-2  border-l-2 '
								/>
							)}
						</div>
					)
				})}
			</nav>
			<CusButton
				onClick={() => {
					setOpenFieldDialog({
						state: true,
						dispatchFn: submitNewPrice,
						dataDialog: { title: 'Название новой таблицы' },
					})
				}}
				className='p-3'
			>
				<FaPlus />
			</CusButton>
		</div>
	)
}
export default memo(ListPrices)
