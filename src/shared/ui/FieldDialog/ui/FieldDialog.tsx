'use client'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { styleTextFiled } from '../../../../../config/muiCustomStyle/textField'
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
		<Dialog open={open} onClose={closeDialog}>
			<Fieldset className=' w-96 border-0'>
				<DialogContent>
					<p className=' text-xs mb-2'>{dataDialog?.title}</p>
					<hr />
					<p>{dataDialog?.message}</p>
					<TextField
						{...styleTextFiled}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						autoFocus
						required
						margin='dense'
						label={dataDialog?.title}
						fullWidth
						helperText={value.length == 0 && 'обязательное поле'}
					/>
				</DialogContent>
				<DialogActions>
					{value.length !== 0 && (
						<CusButton onClick={() => dispatchFn && dispatchFn(value)}>
							<FaRegSave />
						</CusButton>
					)}
					<CusButton onClick={closeDialog}>
						<IoCloseSharp />
					</CusButton>
				</DialogActions>
			</Fieldset>
		</Dialog>
	)
}
