'use client'
import { useFormik } from 'formik'
import { useEffect } from 'react'

import { useMiniLoader } from '../../../shared/model/store/storeMiniLoader'
import { useProcessLoader } from '../../../shared/ui/ProgressLoader/model/storeProcessLoader'

import { typicalError } from '@/shared/model/types/enums'
import { fetchUpdateDataUser } from '../api/updateDataUser'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import FileUpload from '@/shared/components/fileUpload/ui/FileUpload'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { PURPOSE_USE, TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { redirect, useParams } from 'next/navigation'
import { employeeImage } from '../../../../config/urls'
import { isError } from '../../../shared/lib/IsError'
import { TFormProfile } from '../lib/Types'
import ChangeDataProfile from './ChangeDataProfile'

export default function FormProfile({ initialValues, setInfoUser }: TFormProfile) {
	const { INN } = useParams() as { INN: string }
	//const [initialValues, setInfoUser] = useInfoUser((state) => [state.dataUser, state.setInfoUser])
	const { idUser } = useInfoUser((state) => state.dataUser)
	const [setVisibleLoader, visible] = useMiniLoader((state) => [state.setVisibleLoader, state.visible])

	const [setVisibleProgress, setStatusProgress] = useProcessLoader((state) => [
		state.setVisible,
		state.setStatus,
	])

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
					idEmployee: idUser,
					process: PURPOSE_USE.redact,
				}

				const updateDataProfile = await fetchUpdateDataUser(values, location, INN.toString())
				if (updateDataProfile.status !== 200 && isError(updateDataProfile.response)) {
					redirect(`/ERROR/${typicalError.error_DB}`)
				} else {
					setInfoUser && setInfoUser(values)
					setVisibleProgress(false)
				}
			},
			(errPos) => {
				redirect(`/ERROR/${typicalError.not_geo}`)
			}
		)
	}

	const { setFieldValue, handleChange, values } = useFormik({
		initialValues,
		onSubmit,
	})

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
