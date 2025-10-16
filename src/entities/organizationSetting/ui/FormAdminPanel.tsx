'use client'

import { useFormik } from 'formik'
import { memo, useCallback, useMemo } from 'react'

import { FaQuestion } from 'react-icons/fa6'
import {
	TDataHelpInformer,
	useHelInformer,
} from '../../../shared/ui/HelpInformerModalWindow/model/storeHelpInformer'
import ChangeBaseDataOrganization from './ChangeBaseDataOrganization'
import ChangeOptionData from './ChangeOptionData'
import ChangeRequisites from './ChangeRequisites'
import ListAdmins from './ListAdmins'

import { TFullDataSettingOrganization } from '@/app/[INN]/[PHONE]/main/setting/settingorganization/page'

import FileUpload from '@/shared/components/fileUpload/ui/FileUpload'
import { TApprover } from '@/shared/model/types/customType'
import { typicalError } from '@/shared/model/types/enums'
import { PURPOSE_USE, TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TDataOrganization } from '@/shared/model/types/subtypes/TOrganization'
import { redirect } from 'next/navigation'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { isError } from '../../../shared/lib/IsError'
import { useProcessLoader } from '../../../shared/ui/ProgressLoader/model/storeProcessLoader'
import { fetchUpdateInfoOrganization } from '../api/updateInfoRuleOrganization'

export type TFieldFormAdminPanel = {
	activeField: boolean
	defaultData: TApprover<TDataOrganization, 'INN'>
	handlerChange: (e: React.ChangeEvent<any>) => void
}

export type TFormAdminPanel = {
	INN: string
	data: TFullDataSettingOrganization
}

function FormAdminPanel({ data, INN }: TFormAdminPanel) {
	const { daDataOrganization, admins, dataOrganization, dataRequisites } = data
	const dataUser = useInfoUser((state) => state.dataUser)

	const [setVisibleProgress, setStatusProgress] = useProcessLoader((state) => [
		state.setVisible,
		state.setStatus,
	])
	const setOpenHelpInformer = useHelInformer((state) => state.setOpen)

	const messageInformer: TDataHelpInformer = useMemo(() => {
		if (dataUser.linksAllowed === 'ADMIN') {
			return {
				title: 'форма для редактирования информации по организации',
				listMessage: [
					'Данные доступны для изменения',
					'Добавьте печать в формате PNG для автоматического создания счетов',
					'Данную  информация могут изменять только руководитель/администратор',
				],
			}
		} else {
			return {
				title: 'форма для ознакомления с информацией о организации',
				listMessage: ['Данные не доступны для изменения'],
			}
		}
	}, [dataUser.linksAllowed])

	const initialValues: Omit<TFullDataSettingOrganization, 'admins'> = {
		daDataOrganization,
		dataOrganization,
		dataRequisites,
	}

	const onSubmit = async () => {
		setStatusProgress('обновление данных')
		setVisibleProgress({ visible: true, step: 1 })
		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				const { latitude, longitude } = pos.coords
				const location: Omit<TGeoLocation, 'date'> = {
					location: {
						latitude,
						longitude,
					},
					idEmployee: dataUser.idUser,
					process: PURPOSE_USE.redact,
				}
				const response = await fetchUpdateInfoOrganization(values, INN, location)
				if (response.status !== 200 && isError(response.response)) {
					redirect(`/ERROR/${typicalError.error_DB}`)
				} else {
					//
					setVisibleProgress(false)
				}
			},
			(errGeo) => {
				redirect(`/ERROR/${typicalError.not_geo}`)
			}
		)
	}

	const { setFieldValue, handleChange, values } = useFormik({
		initialValues,
		onSubmit,
	})

	const openHelpWindow = useCallback(() => setOpenHelpInformer(true, messageInformer), [])

	return (
		<Fieldset
			className=' mt-2'
			legend={
				<span className=' text-xs  flex gap-2 items-center'>
					<span>Настройка Организации</span>
					<button
						className='   bg-red-50'
						type='button'
						onClick={(e) => {
							e.preventDefault()
							openHelpWindow()
						}}
					>
						<FaQuestion />
					</button>
				</span>
			}
		>
			<form className='w-full h-full '>
				<section className='grid grid-cols-4 gap-5'>
					<ChangeBaseDataOrganization
						activeField={dataUser.linksAllowed !== 'ADMIN'}
						defaultData={initialValues.dataOrganization}
						handlerChange={handleChange}
					/>
					<ListAdmins admins={data.admins} />
					<Fieldset legend='Печать'>
						<FileUpload
							src={dataOrganization.seal}
							nameFiled='dataOrganization.seal'
							set={setFieldValue}
							preview={{ preview: true, width: 150, height: 150 }}
						/>
					</Fieldset>
				</section>
				<section className=' grid grid-cols-3 gap-5 mt-3'>
					<ChangeRequisites
						values={values}
						setFieldValue={setFieldValue}
						activeField={dataUser.linksAllowed !== 'ADMIN'}
						defaultData={initialValues.dataRequisites}
						handlerChange={handleChange}
					/>
					<ChangeOptionData
						INN={INN}
						activeField={dataUser.linksAllowed !== 'ADMIN'}
						defaultData={initialValues.dataOrganization}
						handlerChange={handleChange}
					/>
				</section>
				{dataUser.linksAllowed === 'ADMIN' && (
					<button
						className=' mt-2 w-full'
						type='submit'
						onClick={(e) => {
							e.preventDefault()
							onSubmit()
						}}
					>
						Сохранить
					</button>
				)}
			</form>
		</Fieldset>
	)
}

export default memo(FormAdminPanel)
