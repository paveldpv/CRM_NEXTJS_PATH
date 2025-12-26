'use client'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import CusButton from '@/shared/ui/CusButton'
import { Modal, TextField } from '@mui/material'
import { useCallback, useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'
import { TModalDescriptionTable } from '../model/Types'

export default function ModalDescriptionTable({
	setListDescriptionTable,
	setOpenModal,
	listDescriptionTable,
	openModal,
}: TModalDescriptionTable) {
	const [value, setValue] = useState('')
	const addDescription = () => {
		if(!value)return
		setValue('')
		setListDescriptionTable((prev) => [...prev, value])
	}
	const deletedDescription = useCallback((index: number) => {
		setListDescriptionTable((prev) => prev.filter((_, i) => i != index))
	}, [])

	return (
		<Modal open={openModal} onClose={() => setOpenModal(false)}>
			<>
				<Fieldset legend='дополнительное описание прайса' className='w-1/2 h-1/2 m-auto overflow-auto mt-52'>
					<p className=' text-sm  underline'>Будет видно клиентами при просмотра прайса </p>
					<hr />
					<div className=' gap-1  grid grid-cols-12'>
						<TextField
							fullWidth
							className=' col-span-11 '
							{...styleTextFiled}
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
						 <CusButton hidden={true} onClick={addDescription} className='flex justify-center items-center text-4xl'>
							<IoMdAddCircle />
						</CusButton>
					</div>
					<hr />
					{!listDescriptionTable || listDescriptionTable.length === 0 ? (
						<p>тут пока ничего нет</p>
					) : (
						<ul className='  list-disc list-inside pt-2'>
							{listDescriptionTable.map((el, index) => (
								<li key={index} className='grid grid-cols-12 pt-1 gap-2 '>
									<p className='border-b-2 border-dashed  col-span-11 block  break-all overflow-hidden  '>{el}</p>
									<CusButton onClick={() => deletedDescription(index)} className=' flex items-center justify-center text-2xl'>
										<MdDelete />
									</CusButton>
								</li>
							))}
						</ul>
					)}
					
				</Fieldset>
			</>
		</Modal>
	)
}
