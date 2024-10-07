'use client'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useInfoUser } from '../../../../store/storeInfoUser'
import { useMiniLoader } from '../../../../store/storeMiniLoader'
import { useProcessLoader } from '../../../../store/storeProcessLoader'

import Fieldset from '@/containers/Fieldset'
import { typeDialog } from '@/Types/enums'
import { combineFilesToFormData } from '../../../../function/combineFilesToFormData'
import { fetchUpdateDataUser } from '../../../../service/fetchDataUser'
import { fetchUploadFileOrganization } from '../../../../service/Server/fetchServer'
import { useDialogWindow } from '../../../../store/storeDialogWindow'
import ChangeDataProfile from './ChangeDataProfile'
import ChangePhotoProfile from './ChangePhotoProfile'
import { useParams } from 'next/navigation'
import { isError } from '../../../../function/IsError'
import { TResponseUploadFiles } from '@/Types/Types'

export default function FormProfile() {
	const {INN }=useParams()
	const [initialValues, setInfoUser] = useInfoUser((state) => [
		state.dataUser,
		state.setInfoUser,
	])

	const setOpenDialogWindow = useDialogWindow((state) => state.setOpen)

	const [setVisibleLoader, visible] = useMiniLoader((state) => [
		state.setVisibleLoader,
		state.visible,
	])

	const [uploadPhoto, setUploadPhoto] = useState<File | null>()

	const [setVisibleProgress, setStatus] = useProcessLoader((state) => [
		state.setVisible,
		state.setStatus,
	])

	useEffect(() => {
		setVisibleLoader(false)
	}, [initialValues])
	//#region SUBMIT
	const onSubmit = async () => {
		setVisibleLoader(true) // лоадер активирую

		if (!uploadPhoto) {
			// если нет фота
			setVisibleProgress({ visible: true, step: 1 }) // модалка - запускаю молодка с одним шагом в загрузке
			setStatus('Обновление данных') // статус в этой модалке
			const response = await fetchUpdateDataUser(values) // отправляю данные
			if (response.success) {
				setInfoUser(values)
				setVisibleLoader(false)
				setVisibleProgress(false)
				return
			} else {
				setOpenDialogWindow(
					true,
					{
						title: 'ошибка запроса',
						message: `повторите позже,ошибка : ${response.message}`,
					},
					typeDialog.error
				)
				setVisibleLoader(false)
				setVisibleProgress(false)
				return
			}
		}
		// если фото есть
		setVisibleProgress({ visible: true, step: 2 }) // модалка с загрузкой в 2 шага
		setStatus('Сохранение фотографии') // статус первого шага
		const fileUploadFormData = combineFilesToFormData([uploadPhoto])
		const uploadPhotoServer = await fetchUploadFileOrganization(INN.toString(),
			fileUploadFormData
		) // сохраняю фото - работа с файлами отдельный сервис он сохраняет файлы  и возвращает данные по ним
		if (!uploadPhotoServer && !isError(uploadPhotoServer)) {
			// если ошибка с сохранением файлов
			setOpenDialogWindow(
				true,
				{
					title: 'ошибка загрузки фотографии',
					message: `повторите позже`,
				},
				typeDialog.error
			)
			setVisibleLoader(false)
			setVisibleProgress(false)
			return
		} else {
			setStatus('Обновление данных') // второй шаг
			
			const updateDate = { ...values, srcPhoto: uploadPhotoServer[0] } // обновляю данные на те которые прислал сервис для работы с файлами
			const response = await fetchUpdateDataUser(updateDate) // и сохраняб данные
			if (response.success) {
				setInfoUser(updateDate)
				setVisibleLoader(false)
				setVisibleProgress(false)
				setUploadPhoto(null) //?
				return
			} else {
				setOpenDialogWindow(
					true,
					{
						title: 'ошибка запроса',
						message: `повторите позже,ошибка : ${response.message}`,
					},
					typeDialog.error
				)
				return
			}
		}
	}
	//#endregion

	//#region useFormik
	const { setFieldValue, handleChange, values } = useFormik({
		initialValues,
		onSubmit,
	})

	//#endregion userFormik

	return (
		<Fieldset legend='Профиль'>
			<form className='w-full p-4'>
				<div className=' grid grid-cols-3 mt-2 mb-2'>
					<ChangeDataProfile
						values={values}
						handlerChange={handleChange}
						visible={visible}
						setFieldValue={setFieldValue}
					/>
					<ChangePhotoProfile
						setFiledValue={setFieldValue}
						dataUser={values}
						setVisible={setVisibleLoader}
						visible={visible}
						uploadPhoto={uploadPhoto}
						setUploadPhoto={setUploadPhoto}
					/>
				</div>
				<button
					type='submit'
					onClick={(e) => {
						e.preventDefault()
						onSubmit()
					}}
					className=' w-full '
				>
					Сохранить
				</button>
			</form>
		</Fieldset>
	)
}
