'use client'
import { addPercent } from '@/shared/lib/utils/addPercent'
import useGeo from '@/shared/model/hooks/useGeo'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { typeDialog } from '@/shared/model/types/enums'
import { PURPOSE_USE } from '@/shared/model/types/subtypes/TGeoLocation'
import CusButton from '@/shared/ui/CusButton'
import { useDialogWindow } from '@/shared/ui/dialogWindow/model/storeDialogWindow'
import { useFieldDialog } from '@/shared/ui/FieldDialog/model/storeFiledDialog'
import { useLoader } from '@/shared/ui/namedLoader/model/storeLoader'
import { Tooltip } from '@mui/material'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { CiTextAlignJustify } from 'react-icons/ci'
import { FaSave } from 'react-icons/fa'
import { MdPriceChange } from 'react-icons/md'
import { fetchUpdateDataPrice } from '../api/updateDataPrice'
import { TDataTablePrice, TTablePrice } from '../model/Types'

export default function PanelRuleOptionsTable({
	setDataTable,
	table,
	nameTable,
	setOpenModal,
}: TTablePrice & { setOpenModal: Dispatch<SetStateAction<boolean>> }) {
	const params = useParams() as { INN: string; idTable: string; PHONE: string }
	const { INN, idTable } = params
	const setVisibleLoader = useLoader((state) => state.setVisibleLoader)
	const setOpenFieldDialog = useFieldDialog((state) => state.setOpen)
	const [setOpenDialogWindow, dispatchFn] = useDialogWindow((state) => [
		state.setOpen,
		state.setDispatchFn,
	])

	const { idUser } = useInfoUser((state) => state.dataUser)
	const { dataGeo } = useGeo(idUser, PURPOSE_USE.redact)

	const submitPrice = async () => {
		setVisibleLoader(true)
		const price: TDataTablePrice = {
			data: table,
			nameTable,
			idTable,
			optionDescriptionTable: [], //
		}
		await fetchUpdateDataPrice(INN, price, dataGeo!)
		setOpenDialogWindow(true, { title: 'данные обновлены' }, typeDialog.default)
		setVisibleLoader(false)
	}

	const updatePrice = async (percent?: number | string) => {
		if (!percent || !Number(percent)) return
		const _percent = Number.parseInt(`${percent}`)
		setDataTable &&
			setDataTable((state) =>
				state.map((elTable) =>
					elTable.map((elCell) => ({ ...elCell, value: addPercent(elCell.value, _percent) }))
				)
			)

		setOpenFieldDialog(false)
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

				<Tooltip title='дополнительное описание прайса'>
					<CusButton onClick={() => setOpenModal(true)} className='text-xl p-1'>
						<CiTextAlignJustify />
					</CusButton>
				</Tooltip>
			</div>
		</div>
	)
}
