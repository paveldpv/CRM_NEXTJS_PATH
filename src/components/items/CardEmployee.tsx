'use client'
import Fieldset from '@/containers/Fieldset'
import LeftSlider from '@/containers/LeftSlider'
import { TDBUser, TWithoutPassUser } from '@/Types/Types'
import { TextField, Tooltip } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { VscGistSecret } from 'react-icons/vsc'
import { styleTextFiled } from '../../../config/muiCustomStyle/textField'
import LoginSchemaForm from '../../../validateForm/validateFormAuth'
import SelectedLinkedAllowed from '../additional/SelectedLinkedAllowed'
import ModalInputPassword from '../Modal/ModalInputPassword'
import CusButton from '../UI/CustomElements/CusButton'

type TCardEmployee = {
	setVisibleCardEmployee: (state: boolean) => void
	dataEmployee: TWithoutPassUser | null
}

export default function CardEmployee({ setVisibleCardEmployee, dataEmployee }: TCardEmployee) {
	const [openModal, setOpenModal] = useState(false)
	const [dataPassword,setDataPassword]=useState('')
	const foo =()=>{

	}
	const onSubmit = async () => {
		if(!dataEmployee){
			// setOpenModal(true)
		}
		console.log(values)
	}
	const closeCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		setVisibleCardEmployee(false)
	}

	const changePassword = async () => {}
	const initialValues: Pick<TDBUser, 'name' | 'phone' | 'lastName' | 'nameJobTitle' | 'linksAllowed' | 'surname'> =
		{
			name: dataEmployee?.name || '',
			surname: dataEmployee?.surname || '',
			phone: dataEmployee?.phone || '',
			lastName: dataEmployee?.lastName || '',
			nameJobTitle: dataEmployee?.nameJobTitle || '',
			linksAllowed: dataEmployee?.linksAllowed || [],
		}

	const { values, handleChange, errors, touched, setFieldValue } = useFormik({
		initialValues,
		onSubmit,
		validationSchema: LoginSchemaForm,
	})

	return (
		<div >
			<Fieldset
				className=' opacity-95'
				legend={
					typeof dataEmployee != null
						? 'Добавить нового сотрудника'
						: `${dataEmployee?.surname} ${dataEmployee?.name}`
				}
			>
				<form
					className=' relative'
					onSubmit={(e) => {
						e.preventDefault()
						onSubmit()
					}}
				>
					<section className='grid grid-cols-2 gap-2 mb-2'>
						<TextField
							onChange={handleChange}
							value={values.phone}
							size='small'
							className='col-span-2'
							name='phone'
							autoComplete='off'
							label='телефон'
							placeholder='телефон'
							{...styleTextFiled}
						/>
						<TextField
							onChange={handleChange}
							value={values.name}
							size='small'
							name='name'
							autoComplete='off'
							label='имя'
							placeholder='имя'
							{...styleTextFiled}
						/>
						<TextField
							onChange={handleChange}
							value={values.surname}
							size='small'
							name='surname'
							autoComplete='off'
							label='фамилия'
							placeholder='фамилия'
							{...styleTextFiled}
						/>
						<TextField
							onChange={handleChange}
							value={values.lastName}
							size='small'
							name='lastName'
							autoComplete='off'
							label='отчество'
							placeholder='отчество'
							{...styleTextFiled}
						/>
						{values.linksAllowed === 'ADMIN' ? (
							<div className='  text-center p-2 text-highlight_three underline '>Руководитель</div>
						) : (
							<TextField
								onChange={handleChange}
								value={values.nameJobTitle || 'рабочий на станке'}
								size='small'
								name='nameJobTitle'
								autoComplete='off'
								label='должность'
								placeholder='должность'
								{...styleTextFiled}
							/>
						)}
					</section>

					{dataEmployee?.linksAllowed !== 'ADMIN' && (
						<SelectedLinkedAllowed
							setFieldValue={setFieldValue}
							currentLinkedAllowed={dataEmployee?.linksAllowed}
						/>
					)}

					<div className='flex  justify-between'>
						<CusButton type='submit' className='  text-3xl mt-2'>
							<FaRegSave />
						</CusButton>

						{dataEmployee && (
							<Tooltip title='изменить пароль'>
								<CusButton className='  text-3xl mt-2' onClick={changePassword}>
									<VscGistSecret />
								</CusButton>
							</Tooltip>
						)}

						<CusButton onClick={closeCard} className='  text-3xl mt-2'>
							<IoCloseSharp />
						</CusButton>
					</div>
				</form>
			</Fieldset>

			<ModalInputPassword
			submitFunc={foo}
				handleChangePassword={setDataPassword}
				open={openModal}	
				setOpen={setOpenModal}
				label={dataEmployee ? 'изменить пароль' : 'новый пароль'}
			/>
		</div>
	)
}
