'use client'
import { Modal, Input } from 'antd'
import { useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import Fieldset from '../../../components/fieldSet/ui/Fieldset'
import { useFieldDialog } from '../model/storeFiledDialog'
import CusButton from '../../button/ui/CusButton'

export default function FieldDialog() {
	const [open, setOpen, dispatchFn, onCloseDispatchFn, dataDialog] = useFieldDialog((state) => [
		state.open,
		state.setOpen,
		state.dispatchFn,
		state.onCloseDispatchFn,
		state.dataDialog,
	])
	const [value, setValue] = useState('')

	const closeDialog = () => {
		onCloseDispatchFn && onCloseDispatchFn()
		setOpen(false)
		setValue('')
	}

	return (
		<Modal
			open={open}
			onCancel={closeDialog}
			footer={null}
			closable={false}
			className="p-0"
		>
			<Fieldset className='w-96 border-0 p-0'>
				<div className='p-6'>
					<p className='text-xs mb-2'>{dataDialog?.title}</p>
					<hr className='my-2' />
					<p className='mb-4'>{dataDialog?.message}</p>
					<Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						autoFocus
						required
						placeholder={dataDialog?.title}
						className='w-full'
						status={value.length === 0 ? 'error' : ''}
					/>
					{value.length === 0 && (
						<div className='text-red-500 text-xs mt-1'>
							обязательное поле
						</div>
					)}
				</div>
				<div className='flex justify-end gap-2 p-6 pt-0 border-0 border-t border-solid border-gray-200'>
					{value.length !== 0 && (
						<CusButton onClick={() => dispatchFn && dispatchFn(value)}>
							<FaRegSave />
						</CusButton>
					)}
					<CusButton onClick={closeDialog}>
						<IoCloseSharp />
					</CusButton>
				</div>
			</Fieldset>
		</Modal>
	)
}