'use client'

import { typeDialog } from '@/shared/model/types/enums'

import { motion } from 'framer-motion'
import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'

import { useFormik } from 'formik'
import { useState } from 'react'
import { useDialogWindow } from '../../../shared/ui/dialogWindow/model/storeDialogWindow'

import { fetchUploadFilePrevCal } from '../../../shared/api/file_manager/uploadFile'
import { combineFilesToFormData } from '../../../shared/lib/combineFilesToFormData'
import { fetchRequestPrevCalc } from '../api/fetchRequestPrevCalc'

import TextField from '@mui/material/TextField'

import {
	TInitialValuesFormPrevCalc,
	TRequestPrevCalc,
	TSketchDetail,
} from '@/shared/model/types/subtypes/TRequestPrevCalc'
import { TResponseUploadFiles } from '@/shared/model/types/Types'
import { useProcessLoader } from '../../../shared/ui/ProgressLoader/model/storeProcessLoader'
import SketchDetail from '../lib/konva/SketchDetail/SketchDetail'
import validateSchemaPrevCalc from '../lib/validateSchemaPrevCalc'
import { fieldDataPrevCalc } from '../model/_DataFiledPrevCalc'
import InputFile from './InputFiles/InputFile'

export default function FormPrevCalc({ INN }: { INN: number }) {
	const [setOpenDialogWindow, setDispatchFn] = useDialogWindow((state) => [
		state.setOpen,
		state.setDispatchFn,
	])
	const [dataSketchDetail, setDataSketchDetail] = useState<TSketchDetail[]>()
	const [pendingForm, setPendingForm] = useState(false)
	const [setVisibleProgressLoader, setStatusProgressLader] = useProcessLoader((state) => [
		state.setVisible,
		state.setStatus,
	])

	const onSubmit = async () => {
		if (Object.keys(errors).length !== 0 || values.email.length === 0 || values.phone.length === 0) {
			setOpenDialogWindow(true, { title: 'Заполните обязательные поля' }, typeDialog.error)
			return
		}
		//#region pending form
		setPendingForm(true)
		let responseUploadFile: TResponseUploadFiles[] | undefined
		const files = values.files as File[]

		if (!!files && files.length !== 0) {
			setVisibleProgressLoader({ visible: true, step: 2 })
			setStatusProgressLader('Загрузка файлов...')
			const fileUploadFormData = combineFilesToFormData(files)
			responseUploadFile = await fetchUploadFilePrevCal(fileUploadFormData as FormData)
			if (responseUploadFile === undefined) {
				setVisibleProgressLoader(false)
				setOpenDialogWindow(
					true,
					{
						title: 'Ошибка загрузки файлов ',
						message: 'попробуйте уменьшить объем загружаемых файлов или попробуйте позже',
					},
					typeDialog.error
				)
				return
			}

			setStatusProgressLader('Отправка формы...')
			const dataPrevCalc: Omit<TRequestPrevCalc, 'safeDeleted'> = {
				dataClient: { ...values, files: responseUploadFile },
				dataSketch: dataSketchDetail,
			}
			const response = await fetchRequestPrevCalc(INN, dataPrevCalc)

			if (!response.success) {
				setVisibleProgressLoader(false)
				setOpenDialogWindow(
					true,
					{
						title: 'Ошибка ',
						message: 'Попробуйте позже',
					},
					typeDialog.error
				)
				setPendingForm(false)
				return
			} else {
				setVisibleProgressLoader(false)
				setOpenDialogWindow(true, { title: 'Заявка отправлена' })
				setTimeout(() => {
					location.reload()
				}, 5000)
			}
		} else {
			setVisibleProgressLoader({ visible: true, step: 1 })
			setStatusProgressLader('Отправка формы...')
			const dataPrevCalc: Omit<TRequestPrevCalc, 'safeDeleted'> = {
				dataClient: values,
				dataSketch: dataSketchDetail,
			}
			const response = await fetchRequestPrevCalc(INN, dataPrevCalc)

			if (!response.success) {
				setVisibleProgressLoader(false)
				setOpenDialogWindow(
					true,
					{
						title: 'Ошибка ',
						message: 'Попробуйте позже',
					},
					typeDialog.error
				)
				setPendingForm(false)
				return
			} else {
				setVisibleProgressLoader(false)
				setOpenDialogWindow(true, { title: 'Заявка отправлена' })
				setTimeout(() => {
					location.reload()
				}, 2000)
			}
		}
		//#endregion
	}

	//#region  initialization USE_FORMIK
	const initialValues: TInitialValuesFormPrevCalc = {
		email: '',
		phone: '',
		name: '',
		surName: '',
		description: '',
		INN: '',
		files: undefined,
	}

	const { setFieldValue, handleChange, values, errors, initialErrors, touched } = useFormik({
		initialValues,
		onSubmit,
		validationSchema: validateSchemaPrevCalc,
	})

	//#endregion

	return (
		<form
			style={{ ...(pendingForm && { filter: 'blur(4px)' }) }}
			onSubmit={(e) => {
				e.preventDefault()
				onSubmit()
			}}
			className=' flex  gap-1 h-full  '
		>
			<div className=' w-5/6  border-r-2 border-solid border-menu_color h-5/6 hidden md:block  '>
				<SketchDetail setDataSketchDetail={setDataSketchDetail} dataSketchDetail={dataSketchDetail} />
			</div>

			<motion.div
				whileHover={{ width: 450 }}
				transition={{ delay: 0.5, duration: 0.5 }}
				className=' flex flex-col gap-1 pl-2 pr-2 overflow-scroll h-full'
			>
				<h2 className='  text-menu_color text-xl  text-center border-solid border-menu_color border-b-2 mb-2'>
					Ваши Контакты
				</h2>

				<div className='flex flex-col gap-2  '>
					{fieldDataPrevCalc.map((item, index) => (
						<TextField
							{...styleTextFiled}
							multiline={item?.multiline}
							label={item.placeholder}
							onChange={handleChange}
							title={item.title}
							value={values[item.name]}
							error={Boolean(errors[item.name])}
							helperText={!!errors[item.name] && errors[item.name]}
							key={index}
							name={item.name}
							placeholder={item.placeholder}
						/>
					))}
				</div>
				<InputFile setFieldValue={setFieldValue} values={values.files as FileList | undefined} />
				<button className='xl:text-xl lg:text-xs sm:text-xs' type='submit'>
					Отравить
				</button>
			</motion.div>
		</form>
	)
}
