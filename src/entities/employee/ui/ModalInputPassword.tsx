import IconFieldFormRegistrated from '@/entities/registrated/ui/IconFieldFormRegistrated'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import React, { Dispatch, SetStateAction, useReducer } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'

import { Modal, Input } from 'antd'
import CusButton from '@/shared/ui/button/ui/CusButton'

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
		<Modal
			open={open}
			onCancel={() => setOpen(false)}
			footer={null}
			closable={false}
			className="flex justify-center items-center"
			width={400}
		>
			<Fieldset legend={label} className='w-96 top-1/2'>
				<section className='mb-4'>
					<Input
						translate='no'
						prefix={
							<span 
								className='cursor-pointer mr-2'
								onClick={() => dispatchVisiblePas()}
							>
								<IconFieldFormRegistrated nameFiled={visiblePas ? 'visiblePassword' : 'password'} />
							</span>
						}
						type={visiblePas ? 'password' : 'text'}
						autoComplete='off'
						onChange={(e) => handleChangePassword(e.target.value)}
						placeholder='пароль'
						className='w-full'
					/>
				</section>
				<section>
					<div className='flex justify-between'>
						<CusButton 
							className='text-3xl mt-2'
							onClick={(e) => {
								submitFunc(e)
								setOpen(false)
							}}
						>
							<FaRegSave />
						</CusButton>
						<CusButton 
							className='text-3xl mt-2' 
							onClick={() => setOpen(false)}
						>
							<IoCloseSharp />
						</CusButton>
					</div>
				</section>
			</Fieldset>
		</Modal>
	)
}