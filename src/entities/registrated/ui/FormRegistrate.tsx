'use client'
import { typeDialog, typicalError } from '@/shared/model/types/enums'
import { PURPOSE_USE, TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'

import { InputAdornment, TextField } from '@mui/material'
import { fieldData } from '../../registrated/model/FieldData'

import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useMiniLoader } from '../../../shared/model/store/storeMiniLoader'
import { useDialogWindow } from '../../../shared/ui/dialogWindow/model/storeDialogWindow'

import SignupSchemaFormRegistrate from '../lib/validateFormRegistrate'

import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'
import { fetchRegistrate } from '../api/fetchRegistrate'

import { TFormRegistrate } from '@/shared/model/types/Types'
import MiniLoader from '@/shared/ui/loaders/MiniLoader'
import Link from 'next/link'
import { useEffect, useReducer } from 'react'
import IconFieldFormRegistrated from './IconFieldFormRegistrated'

export default function FormRegistrate() {
	const [visiblePas, dispatchVisiblePas] = useReducer((state) => !state, true)
	const [loader, setLoader] = useMiniLoader((state) => [state.visible, state.setVisibleLoader])
	const [setOpenDialog] = useDialogWindow((state) => [state.setOpen])

	useEffect(() => {
		setLoader(false)
	}, [setLoader])

	const { push } = useRouter()

	const initialValues: TFormRegistrate = {
		email: '',
		password: '',
		phone: '',
		INN: '',

		//INN:null
	}

	const onSubmit = async () => {
		setLoader(true)
		if (Object.keys(errors).length) return

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				const { latitude, longitude } = pos.coords

				const dataGeo: Omit<TGeoLocation, 'date' | 'idEmployee'> = {
					location: {
						latitude,
						longitude,
					},
					process: PURPOSE_USE.registrate,
				}

				const newUser = {
					...values,
				}

				const candidateNewAdmin = await fetchRegistrate(newUser, dataGeo)

				if (candidateNewAdmin.status === 200 && candidateNewAdmin.response === 'OK') {
					localStorage.setItem('mes_phone', newUser.phone)
					localStorage.setItem('mes_INN', newUser.INN)
					localStorage.setItem('mes_password', newUser.password)

					setLoader(false)
					setOpenDialog(true, { title: 'регистрация прошла успешно' })

					setTimeout(() => {
						setOpenDialog(false)
						push('/sign')
					}, 1700)
				} else {
					setOpenDialog(
						true,
						{
							title: 'Ошибка',
							message: `статус сервера : ${
								candidateNewAdmin.status === 200 ? ' ДОСТУПЕН ' : ' неполадки на сервере'
							} , ошибка ${candidateNewAdmin.response !== 'OK' && candidateNewAdmin.response.message}`,
						},
						typeDialog.error
					)
				}
				setLoader(false)
			},
			(errGeo) => {
				push(`/ERROR/${typicalError.not_geo}`)
			}
		)
	}

	const { handleChange, values, errors, setErrors, initialErrors } = useFormik({
		initialValues,
		onSubmit,
		validationSchema: SignupSchemaFormRegistrate,
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				onSubmit()
			}}
			className={` relative w-3/4  `}
		>
			<MiniLoader className=' absolute left-1/2  top-56 scale-150' />

			<div
				className={`bg-color_header p-9 rounded-md flex flex-col gap-4  ${
					loader && 'blur-md opacity-70 delay-500  duration-500'
				}`}
			>
				{fieldData.map((field, index) => (
					<TextField
						translate='no'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<span
										className=' cursor-pointer'
										onClick={() => field.name === 'password' && dispatchVisiblePas()}
									>
										{field.name === 'password' ? (
											<IconFieldFormRegistrated
												nameFiled={visiblePas ? 'visiblePassword' : 'password'}
											/>
										) : (
											// @ts-ignore
											<IconFieldFormRegistrated nameFiled={field.name} />
										)}
									</span>
								</InputAdornment>
							),
						}}
						type={field.name === 'password' && visiblePas ? 'password' : 'text'}
						autoComplete='off'
						onChange={handleChange}
						key={index}
						label={field.placeholder}
						{...styleTextFiled}
						placeholder={field.placeholder}
						disabled={loader}
						name={field.title}
						title={field.placeholder}
						helperText={<span className=' text-red-800'>{errors[field.title]}</span>}
						error={!!errors[field.title]}
					/>
				))}
				<button type='submit' hidden={loader} className={`buttonSubmit`}>
					Регистрация
				</button>
				<Link
					hidden={loader}
					className=' rounded-xl p-5 bg-highlight_two w-24 font-bold text-4xs hover:underline hover:text-highlight_one'
					href={'/sign'}
				>
					Войти
				</Link>
			</div>
		</form>
	)
}
