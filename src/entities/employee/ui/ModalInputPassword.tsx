
import IconFieldFormRegistrated from '@/entities/registrated/ui/IconFieldFormRegistrated'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { InputAdornment, Modal, TextField } from '@mui/material'
import React, { Dispatch, SetStateAction, useReducer } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'
import CusButton from '@/shared/ui/CusButton'


export type TModalInputPassword = {
	open: boolean
	setOpen: (open: boolean) => void
	submitFunc: (e: React.MouseEvent) => void
	handleChangePassword: Dispatch<SetStateAction<string>>
	label?: string
}

export default function ModalInputPassword({
	label,
	setOpen,
	submitFunc,
	handleChangePassword,
	open,
}: TModalInputPassword) {
	const [visiblePas, dispatchVisiblePas] = useReducer((state) => !state, false)
	return (
		<Modal open={open} className=' flex justify-center  items-center'>
			<Fieldset legend={label} className=' w-96 top-1/2 h-1/4 '>
				<section>
					<TextField
						fullWidth
						translate='no'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<span className=' cursor-pointer' onClick={() => dispatchVisiblePas()}>
										<IconFieldFormRegistrated nameFiled={visiblePas ? 'visiblePassword' : 'password'} />
									</span>
								</InputAdornment>
							),
						}}
						type={visiblePas ? 'password' : 'text'}
						autoComplete='off'
						onChange={(e) => handleChangePassword(e.target.value)}
						label={'пароль'}
						{...styleTextFiled}
						placeholder={'пароль'}
						title={'пароль'}
					/>
				</section>
				<section>
					<div
						className=' flex justify-between'
						onClick={(e) => {
							setOpen(false)
							submitFunc(e)
						}}
					>
						<CusButton className='  text-3xl mt-2'>
							<FaRegSave />
						</CusButton>
						<CusButton className='  text-3xl mt-2' onClick={() => setOpen(false)}>
							<IoCloseSharp />
						</CusButton>
					</div>
				</section>
			</Fieldset>
		</Modal>
	)
}
