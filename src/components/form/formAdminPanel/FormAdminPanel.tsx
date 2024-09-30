'use client'

import { TDBUser } from '@/Types/Types'
import InputPicture from '@/components/UI/InputElements/InputPicture/InputPicture'
import HelpInformerModalWindow from '@/components/additional/HelpInformerModalWindow'
import { useFormik } from 'formik'
import { memo, useCallback, useMemo } from 'react'

import { FaQuestion } from 'react-icons/fa6'
import {
	TDataHelpInformer,
	useHelInformer,
} from '../../../../store/storeHelpInformer'
import ChangeBaseDataOrganization from './ChangeBaseDataOrganization'
import ChangeOptionData from './ChangeOptionData'
import ChangeRequisites from './ChangeRequisites'
import ListAdmins from './ListAdmins'

import { TApprover } from '@/Types/customType'
import { TDataOrganization } from '@/Types/subtypes/TOrganization'
import { TFullDataSettingOrganization } from '@/app/[INN]/[PHONE]/main/setting/settingorganization/page'
import { useInfoUser } from '../../../../store/storeInfoUser'

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
	const dataUser = useInfoUser((state) => state.dataUser) as TDBUser

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
		console.log(values)
	}
	const { setFieldValue, handleChange, values } = useFormik({
		initialValues,
		onSubmit,
	})

	const openHelpWindow = useCallback(() => setOpenHelpInformer(true, messageInformer),[])

	return (
		<>
			<fieldset className=' border-2 border-solid border-menu_color p-2 text-2xl  rounded-md '>
				<legend className='pr-1 pl-1  text-sm '>
					Настройка Организации
					<button
						className='m-2 text  bg-red-50'
						type='button'
						onClick={(e) => {
							e.preventDefault()
							openHelpWindow()
						}}
					>
						<FaQuestion />
					</button>
				</legend>
				<form className='w-full h-full col-span-3'>
					<section className='grid grid-cols-4 gap-5'>
						<ChangeBaseDataOrganization
							activeField={dataUser.linksAllowed !== 'ADMIN'}
							defaultData={initialValues.dataOrganization}
							handlerChange={handleChange}
						/>
						<ListAdmins admins={data.admins} />
						<InputPicture
							name='seal'
							imageHeight={0}
							imageWidth={0}
							imageAlt={''}
							handlerChangePicture={function (file: File): void {
								throw new Error('Function not implemented.')
							}}
							visible={false}
							defaultSrc={''}
						/>
					</section>
					<section className=' grid grid-cols-3 gap-5 mt-3'>
						<ChangeRequisites
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
			</fieldset>
			<HelpInformerModalWindow />
		</>
	)
}
export default memo(FormAdminPanel)
