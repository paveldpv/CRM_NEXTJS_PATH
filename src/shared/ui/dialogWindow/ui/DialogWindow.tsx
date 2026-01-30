'use client'
import { Modal, ModalProps } from 'antd'
import { FaWindowClose } from 'react-icons/fa'

import CusButton from '../../button/ui/CusButton'
import { useDialogWindow } from '../model/storeDialogWindow'
import { typeDialog, TBodyDialogMessage } from '../model/Types/Types'

const style: React.CSSProperties = {
	border: '2px solid red',
	color: 'red',
	borderRadius: '0.2rem',
}

export default function DialogWindow() {
	const [open, type, setOpen, dataDialog, dispatchFn]: [
		boolean,
		typeDialog,
		(state: boolean) => void,
		TBodyDialogMessage | undefined,
		any
	] = useDialogWindow((state) => [state.open, state.type, state.setOpen, state.dataDialog, state.dispatchFn])

	const modalProps: ModalProps = {
		open: open,
		onCancel: () => setOpen(false),
		footer: null, // Будем рендерить футер вручную
		centered: true,
		closable: false, // Убираем стандартную кнопку закрытия
		className: 'absolute',
	}

	return (
		<Modal {...modalProps}>
			<div style={(type === typeDialog.error && style) || undefined}>
				{dataDialog && (
					<div className='ant-modal-header flex justify-between gap-4 items-center p-4 border-0 border-b border-solid border-gray-200'>
						<span className='text-4xl hover:cursor-pointer'>
							<FaWindowClose onClick={() => setOpen(false)} />
						</span>
						<div className='ant-modal-title text-lg font-semibold'>
							{dataDialog.title}
						</div>
					</div>
				)}
				<div className='ant-modal-body p-4'>
					<section className='text-center'>
						{dataDialog?.message && (
							<div className='text-xl text-gray-800'>
								{dataDialog.message}
							</div>
						)}
					</section>
				</div>
			</div>
			{type === typeDialog.dialog && (
				<div className='ant-modal-footer flex justify-end gap-2 p-4 border-0 border-t border-solid border-gray-200'>
					<CusButton
						onClick={() => {
							setOpen(false)
						}}
					>
						Отмена
					</CusButton>
					<CusButton
						onClick={() => {
							dispatchFn()
							setOpen(false)
						}}
					>
						Подтвердить
					</CusButton>
				</div>
			)}
		</Modal>
	)
}