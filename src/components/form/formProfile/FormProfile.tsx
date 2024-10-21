'use client'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useInfoUser } from '../../../../store/storeInfoUser'
import { useMiniLoader } from '../../../../store/storeMiniLoader'
import { useProcessLoader } from '../../../../store/storeProcessLoader'

import Fieldset from '@/containers/Fieldset'
import { typicalError } from '@/Types/enums'
import { fetchUpdateDataUser } from '../../../../service/user/updateDataUser'

import FileUpload from '@/components/UI/InputElements/fileUpload/FileUpload'
import { PURPOSE_USE, TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { redirect, useParams } from 'next/navigation'
import { employeeImage } from '../../../../config/urls'
import { isError } from '../../../../function/IsError'
import ChangeDataProfile from './ChangeDataProfile'

export default function FormProfile() {
	const { INN } = useParams()
	const [initialValues, setInfoUser] = useInfoUser((state) => [state.dataUser, state.setInfoUser])

	const [setVisibleLoader, visible] = useMiniLoader((state) => [state.setVisibleLoader, state.visible])

	const [setVisibleProgress, setStatusProgress] = useProcessLoader((state) => [state.setVisible, state.setStatus])

	useEffect(() => {
		setVisibleLoader(false)
	}, [initialValues])

	
	const onSubmit = async () => {
		setStatusProgress('обновление данных')
		setVisibleProgress({ visible: true, step: 1 })
		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				const { latitude, longitude } = pos.coords
				const location: Omit<TGeoLocation, 'date'> = {
					location: { latitude, longitude },
					idEmployee: initialValues.idUser,
					process: PURPOSE_USE.redact,
				}

				const updateDataProfile = await fetchUpdateDataUser(values, location, INN.toString())
				if (updateDataProfile.status !== 200 && isError(updateDataProfile.response)) {
					redirect(`/ERROR/${typicalError.error_DB}`)
				} else {
					setInfoUser(values)
					setVisibleProgress(false)
				}
			},
			(errPos) => {
				redirect(`/ERROR/${typicalError.not_geo}`)
			}
		)
	}
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
					<FileUpload
						src={values.srcPhoto}
						set={setFieldValue}
						nameFiled='srcPhoto'
						preview={{ preview: true, width: 200, height: 400, alt: employeeImage }}
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
