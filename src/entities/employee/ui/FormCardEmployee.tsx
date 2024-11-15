'use client'

import { typeDialog, typicalError } from '@/shared/model/types/enums'
import { PURPOSE_USE, TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'

import { TextField, Tooltip } from '@mui/material'
import { useFormik } from 'formik'
import { redirect, useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { VscGistSecret } from 'react-icons/vsc'
import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { TNewEmployee, TWithoutPassUser } from '@/shared/model/types/Types'
import CusButton from '@/shared/ui/CusButton'
import { isError } from '../../../shared/lib/IsError'
import { useDialogWindow } from '../../../shared/model/store/storeDialogWindow'
import { fetchUpdateDataUser } from '../../userProfile/api/updateDataUser'
import { fetchAddNewEmployee } from '../api/addNewEmployee'
import { fetchGetEmployee, TParamsAllEmployee } from '../api/getEmployee'
import { fetchUpdatePasEmployee } from '../api/updatePasFromEmployee'
import NewEmployeeSchemaForm from '../lib/validateFormNewEmployee'
import ModalInputPassword from './ModalInputPassword'
import SelectedLinkedAllowed from './SelectedLinkedAllowed'

type TCardEmployee = {
	setVisibleCardEmployee: (state: boolean) => void
	dataEmployee: TWithoutPassUser | null
	setEmployees: Dispatch<SetStateAction<TWithoutPassUser[] | []>>

	setVisibleLoader: Dispatch<SetStateAction<boolean>>
}

export default function FormCardEmployee({
	setVisibleCardEmployee,
	dataEmployee,
	setEmployees,

	setVisibleLoader,
}: TCardEmployee) {
	

	const [openModal, setOpenModal] = useState(false)
	const [dataGeo, setDataGeo] = useState<Omit<TGeoLocation, 'date'> | null>(null)
	const [dataPassword, setDataPassword] = useState('')
	const { idUser, INN } = useInfoUser((state) => state.dataUser)
	const setOpenDialogWindow = useDialogWindow((state) => state.setOpen)
	
	const searchParams = useSearchParams()
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(data) => {
				const { latitude, longitude } = data.coords
				setDataGeo({
					location: {
						latitude,
						longitude,
					},
					idEmployee: idUser,
					process: PURPOSE_USE.redact,
				})
			},
			() => {
				redirect(`/ERROR/${typicalError.not_geo}`)
			}
		)
	}, [])

	const setNewPassword = async (e: React.MouseEvent) => {
		e.preventDefault()
		if (dataPassword.length === 0 || !dataEmployee) {
			setOpenDialogWindow(true, { title: 'пароль не должен быть пустым' }, typeDialog.error)
			return
		}
		const setNewPas = await fetchUpdatePasEmployee(INN, dataPassword, dataEmployee?.idUser, dataGeo!)
		if (isError(setNewPas)) {
			redirect(`/ERROR/${setNewPas.typeError}`)
		}
		setVisibleCardEmployee(false)
		setVisibleLoader(true)
		setOpenDialogWindow(true, { title: 'пароль успешно обновлен' }, typeDialog.default)
	}

	const addNewEmployee = async (e: React.MouseEvent) => {
		// setVisibleLoader(false)
		e.preventDefault()
		if (dataPassword.length === 0) {
			setOpenDialogWindow(true, { title: 'пароль не должен быть пустым' }, typeDialog.error)
			return
		}
		const isListEmployeeWithDeleted =
			searchParams.get('all') === null ? 0 : (Number(searchParams.get('all')) as TParamsAllEmployee)
		setVisibleCardEmployee(false)
		setVisibleLoader(true)
		const newEmployee = { ...dataEmployee, ...values, password: dataPassword } as TNewEmployee
		const addNewEmployee = await fetchAddNewEmployee(INN, newEmployee, dataGeo!)

		if (isError(addNewEmployee)) {
			redirect(`/ERROR/${addNewEmployee.typeError}`)
		} else {
			const getAllEmployee = await fetchGetEmployee(INN, isListEmployeeWithDeleted)
			if (isError(getAllEmployee)) {
				redirect(`/ERROR/${getAllEmployee.typeError}`)
			} else {
				setEmployees(getAllEmployee)
				setVisibleLoader(false)
				// setVisibleCardEmployee(false)
			}
		}
	}

	const onSubmit = async () => {
		if (!dataEmployee) {
			setOpenModal(true)
			return
		}
		const isListEmployeeWithDeleted =
			searchParams.get('all') === null ? 0 : (Number(searchParams.get('all')) as TParamsAllEmployee)
		setVisibleLoader(true)
		const updateDataEmployee = { ...dataEmployee, ...values } as TWithoutPassUser
		const updateUser = await fetchUpdateDataUser(updateDataEmployee, dataGeo!, INN)
		if (isError(updateUser)) {
			redirect(`/ERROR/${updateUser.typeError}`)
		} else {
			const getAllEmployee = await fetchGetEmployee(INN, isListEmployeeWithDeleted)
			if (isError(getAllEmployee)) {
				redirect(`/ERROR/${getAllEmployee.typeError}`)
			} else {
				setEmployees(getAllEmployee)
				setVisibleLoader(false)
			}
		}
	}
	const closeCard = (e: React.MouseEvent) => {
		e.preventDefault()
		setVisibleCardEmployee(false)
	}

	const changePassword = async (e: React.MouseEvent) => {
		e.preventDefault()
		setOpenModal(true)
	}

	const initialValues: TNewEmployee = useMemo(()=>{
		return {
			name: dataEmployee?.name || '',
			surname: dataEmployee?.surname || '',
			phone: dataEmployee?.phone || '',
			lastName: dataEmployee?.lastName || '',
			nameJobTitle: dataEmployee?.nameJobTitle || '',
			linksAllowed: dataEmployee?.linksAllowed || [],
			password: '',
			INN: INN,
		}
	},[dataEmployee])

	const { values, handleChange, errors, touched, setFieldValue } = useFormik({
		initialValues,
		onSubmit,
		validationSchema: NewEmployeeSchemaForm,
	})
console.log(values);

	return (
		<div>
			<Fieldset
				className=' opacity-95'
				legend={!dataEmployee ? 'Добавить нового сотрудника' : `${dataEmployee?.surname} ${dataEmployee?.name}`}
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
							disabled={!!dataEmployee?.phone}
							helperText={errors.phone}
							error={!!errors.phone}
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
				submitFunc={dataEmployee ? setNewPassword : addNewEmployee}
				handleChangePassword={setDataPassword}
				open={openModal}
				setOpen={setOpenModal}
				label={dataEmployee ? 'изменить пароль' : 'новый пароль'}
			/>
		</div>
	)
}
