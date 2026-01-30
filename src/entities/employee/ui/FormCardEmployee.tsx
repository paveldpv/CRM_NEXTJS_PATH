'use client'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'

import { Form, Input, Tooltip } from 'antd'
import { useFormik } from 'formik'
import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import { VscGistSecret } from 'react-icons/vsc'

import { PURPOSE_USE, TUserDTOWithoutPas } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { typeDialog } from '@/shared/ui/dialogWindow/model/Types/Types'
import { useDialogWindow } from '../../../shared/ui/dialogWindow/model/storeDialogWindow'

import useGeo from '@/shared/model/hooks/useGeo'
import NewEmployeeSchemaForm from '../lib/validateFormNewEmployee'
import ModalInputPassword from './ModalInputPassword'
import SelectedLinkedAllowed from './SelectedLinkedAllowed'

type TCardEmployee = {
	setVisibleCardEmployee: (state: boolean) => void
	dataEmployee: TUserDTOWithoutPas | null
	setEmployees: Dispatch<SetStateAction<TUserDTOWithoutPas[] | []>>

	setVisibleLoader: Dispatch<SetStateAction<boolean>>
}

export default function FormCardEmployee({
	setVisibleCardEmployee,
	dataEmployee,
	setEmployees,

	setVisibleLoader,
}: TCardEmployee) {
	const [openModal, setOpenModal] = useState(false)

	// const [dataGeo, setDataGeo] = useState<Omit<TGeoLocation, 'date'> | null>(null)
	const [dataPassword, setDataPassword] = useState('')
	const { _id, INN } = useInfoUser((state) => state.dataUser!)
	const setOpenDialogWindow = useDialogWindow((state) => state.setOpen)
	const dataGeo = useGeo(_id, PURPOSE_USE.redact, 'добавил нового сотрудника')

	const searchParams = useSearchParams()

	const setNewPassword = async (e: React.MouseEvent) => {
		e.preventDefault()
		if (dataPassword.length === 0 || !dataEmployee) {
			setOpenDialogWindow(true, { title: 'пароль не должен быть пустым' }, typeDialog.error)
			return
		}
		//TODO:
		// const setNewPas = await fetchUpdatePasEmployee(INN, dataPassword, dataEmployee?.idUser, dataGeo!)
		// if (isError(setNewPas)) {
		// 	redirect(`/ERROR/${setNewPas.typeError}`)
		// }
		setVisibleCardEmployee(false)
		setVisibleLoader(true)
		setOpenDialogWindow(true, { title: 'пароль успешно обновлен' }, typeDialog.default)
	}

	const addNewEmployee = async (e: React.MouseEvent) => {
		return
		// setVisibleLoader(false)
	}

	const onSubmit = async () => {
		if (!dataEmployee) {
			setOpenModal(true)
			return
		}
		//searchParams!.get('all') === null ? 0 : (Number(searchParams!.get('all')) as TParamsAllEmployee)
		return
	}
	const closeCard = (e: React.MouseEvent) => {
		e.preventDefault()
		setVisibleCardEmployee(false)
	}

	const changePassword = async (e: React.MouseEvent) => {
		e.preventDefault()
		setOpenModal(true)
	}
	//TODO:

	const initialValues = useMemo(() => {
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
	}, [dataEmployee])

	const { values, handleChange, errors, touched, setFieldValue } = useFormik({
		initialValues,
		onSubmit,
		validationSchema: NewEmployeeSchemaForm,
	})
	console.log(values)

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
						<Form.Item
							label='телефон'
							validateStatus={errors.phone ? 'error' : ''}
							help={errors.phone}
							className='col-span-2 mb-0'
						>
							<Input
								disabled={!!dataEmployee?.phone}
								onChange={handleChange}
								value={values.phone}
								size='small'
								name='phone'
								autoComplete='off'
								placeholder='телефон'
							/>
						</Form.Item>
						<Input
							onChange={handleChange}
							value={values.name}
							size='small'
							name='name'
							autoComplete='off'
							placeholder='имя'
						/>
						<Input
							onChange={handleChange}
							value={values.surname}
							size='small'
							name='surname'
							autoComplete='off'
							placeholder='фамилия'
						/>
						<Input
							onChange={handleChange}
							value={values.lastName}
							size='small'
							name='lastName'
							autoComplete='off'
							placeholder='отчество'
						/>
						{values.linksAllowed === 'ADMIN' ? (
							<div className='  text-center p-2 text-highlight_three underline '>Руководитель</div>
						) : (
							<Input
								onChange={handleChange}
								value={values.nameJobTitle || 'рабочий на станке'}
								size='small'
								name='nameJobTitle'
								autoComplete='off'
								placeholder='должность'
							/>
						)}
					</section>

					{dataEmployee?.linksAllowed !== 'ADMIN' && (
						<SelectedLinkedAllowed setFieldValue={setFieldValue} currentLinkedAllowed={dataEmployee?.linksAllowed} />
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
