'use client'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FaWindowClose } from 'react-icons/fa'

import CusButton from '../../button/ui/CusButton'
import { useDialogWindow } from '../model/storeDialogWindow'
import { typeDialog, TBodyDialogMessage } from '../model/Types/Types'

const style: React.CSSProperties = {
	border: 2,
	borderColor: 'red',
	borderStyle: 'solid',
	color: 'red',
	borderRadius:'0.2rem',
	
}

export default function DialogWindow() {
	const [open, type, setOpen, dataDialog, dispatchFn]: [
		boolean,
		typeDialog,
		(state: boolean) => void,
		TBodyDialogMessage | undefined,
		any
	] = useDialogWindow((state) => [state.open, state.type, state.setOpen, state.dataDialog, state.dispatchFn])

	return (
		<Dialog
			className=' absolute '
			open={open}
			keepMounted
			onClose={() => setOpen(false)}
			aria-describedby='alert-dialog-slide-description'
		>
			<div style={(type === typeDialog.error && style) || undefined}>
				{dataDialog && (
					<DialogTitle className=' flex justify-between gap-4 '>
						<span className=' text-4xl  hover:cursor-pointer'>
							<FaWindowClose onClick={() => setOpen(false)} />
						</span>
						{dataDialog.title}
					</DialogTitle>
				)}
				<DialogContent>
					<section className=' text-center'>
						{dataDialog?.message && (
							<DialogContentText className=' text-xl ' id='alert-dialog-slide-description'>
								{dataDialog.message}
							</DialogContentText>
						)}
					</section>
				</DialogContent>
			</div>
			{type === typeDialog.dialog && (
				<DialogActions>
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
				</DialogActions>
			)}
		</Dialog>
	)
}
