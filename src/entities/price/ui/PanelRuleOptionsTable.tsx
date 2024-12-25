'use client'
import { addPercent } from '@/shared/lib/addPercent'
import { isError } from '@/shared/lib/IsError'
import { useDialogWindow } from '@/shared/model/store/storeDialogWindow'
import { useFieldDialog } from '@/shared/model/store/storeFiledDialog'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { useLoader } from '@/shared/model/store/storeLoader'
import { typeDialog, typicalError } from '@/shared/model/types/enums'
import { PURPOSE_USE, TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import CusButton from '@/shared/ui/CusButton'
import { Tooltip } from '@mui/material'
import { redirect, useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AiOutlineClear } from 'react-icons/ai'
import { CiTextAlignJustify } from 'react-icons/ci'
import { FaSave } from 'react-icons/fa'
import { MdDelete, MdOutlineDriveFileRenameOutline, MdPriceChange } from 'react-icons/md'
import { fetchRemovePrice } from '../api/removePrice'
import { fetchRenamePrice } from '../api/renamePrice'
import { fetchUpdateDataPrice } from '../api/updateDataPrice'
import { TDataTablePrice, TTablePrice } from '../model/Types'

export default function PanelRuleOptionsTable({
	setDataTable,
	table,
	nameTable,
	setOpenModal,
}: TTablePrice & { setOpenModal: Dispatch<SetStateAction<boolean>> }) {
	const params = useParams() as { INN: string; idTable: string }
	const { INN, idTable } = params
	const setVisibleLoader = useLoader((state) => state.setVisibleLoader)
	const setOpenFieldDialog = useFieldDialog((state) => state.setOpen)
	const [setOpenDialogWindow, dispatchFn] = useDialogWindow((state) => [state.setOpen, state.dispatchFn])
	const { idUser } = useInfoUser((state) => state.dataUser)
	const [dataGeo, setDataGeo] = useState<Omit<TGeoLocation, 'date'>>()

	useEffect(() => {
		setVisibleLoader(true)
		navigator.geolocation.getCurrentPosition(
			(dataGeo) => {
				const { latitude, longitude } = dataGeo.coords
				const geoData: Omit<TGeoLocation, 'date'> = {
					location: {
						latitude,
						longitude,
					},
					process: PURPOSE_USE.redact,
					idEmployee: idUser,
				}
				setDataGeo(geoData)
				setVisibleLoader(false)
			},
			(errGeo) => {
				if (errGeo) {
					redirect(`/ERROR/${typicalError.not_geo}`)
				}
			}
		)
	}, [])

	const renamePrice = async (newNamePrice?: string) => {
		if (!newNamePrice) return
		setVisibleLoader(true)
		const renamePrice = await fetchRenamePrice(INN, newNamePrice, idTable, dataGeo!)
		if (isError(renamePrice)) {
			redirect(`/ERROR/${typicalError.error_DB}`)
		} else {
			setVisibleLoader(false)
			redirect(`/price/${idTable}`)
		}
	}

	const submitPrice = async () => {
		setVisibleLoader(true)		
		
		const price: TDataTablePrice = {
			data: table,
			nameTable,
			idTable,
			optionDescriptionTable: [], //
		}
		const savePrice = await fetchUpdateDataPrice(INN, price, dataGeo!)
		if (isError(savePrice)) {
			redirect(`/ERROR/${typicalError.error_DB}`)
		} else {
			setOpenDialogWindow(true, { title: 'данные обновлены' }, typeDialog.default)
			setVisibleLoader(false)
			
		}
	}

	const updatePrice = async (percent?: number | string) => {
		if (!percent || !Number(percent)) return
		const _percent = Number.parseInt(`${percent}`)

		setDataTable &&
			setDataTable((state) =>
				state.map((elTable) => elTable.map((elCell) => ({ ...elCell, value: addPercent(elCell.value, _percent) })))
			)

		setOpenFieldDialog(false)
	}

	const deletedPrice = async () => {
		if (idTable === 'initialPrice') return

		setOpenDialogWindow(true, { title: `удалить таблицу ${nameTable} `, message: `уверены?` }, typeDialog.dialog)
		dispatchFn(async () => {
			setVisibleLoader(true)
			const removePrice = await fetchRemovePrice(INN, idTable, dataGeo!)
			if (isError(removePrice)) {
				redirect(`/ERROR/${typicalError.error_DB}`)
			} else {
				setVisibleLoader(false)
				redirect(`/price/initialPrice`)
			}
		})
	}
	const clearTable = () => {
		setDataTable &&
			setDataTable((state) => state.map((elTable) => elTable.map((cell) => ({ ...cell, value: '' }))))
	}

	return (
		<div className='flex gap-2 '>
			<CusButton onClick={submitPrice} className='p-1 text-xl '>
				<FaSave />
			</CusButton>
			<div className=' w-[2px] h-full bg-menu_color rounded-xl'></div>
			<div className=' flex gap-1'>
				<Tooltip title={'обновить ценовое значение для всего'}>
					<CusButton
						onClick={() => {
							setOpenFieldDialog({
								state: true,
								dispatchFn: updatePrice,
								dataDialog: { title: nameTable, message: 'изменить все текущие значения цен на... %' },
							})
						}}
						className='p-1 text-xl '
					>
						<MdPriceChange />
					</CusButton>
				</Tooltip>
				<Tooltip title='переименовать таблицу'>
					<CusButton
						onClick={() => {
							setOpenFieldDialog({
								state: true,
								dispatchFn: renamePrice,
								dataDialog: { title: nameTable, message: 'введите новое название...' },
							})
						}}
						className='p-1 text-xl'
					>
						<MdOutlineDriveFileRenameOutline />
					</CusButton>
				</Tooltip>
				<Tooltip title='очистить значения'>
					<CusButton onClick={clearTable} className='text-xl p-1'>
						<AiOutlineClear />
					</CusButton>
				</Tooltip>
				<Tooltip title='дополнительное описание прайса'>
					<CusButton onClick={() => setOpenModal(true)} className='text-xl p-1'>
						<CiTextAlignJustify />
					</CusButton>
				</Tooltip>
				{idTable !== 'initialPrice' && (
					<CusButton onClick={deletedPrice} className='p-1 text-xl'>
						<MdDelete />
					</CusButton>
				)}
			</div>
		</div>
	)
}
