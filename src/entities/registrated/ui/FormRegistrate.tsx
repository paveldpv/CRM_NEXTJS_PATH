'use client'
import { typicalError } from '@/shared/model/types/subtypes/enums'

import { InputAdornment, TextField } from '@mui/material'
import { fieldData } from '../../registrated/model/FieldData'

import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useMiniLoader } from '../../../shared/model/store/storeMiniLoader'
import { useDialogWindow } from '../../../shared/ui/dialogWindow/model/storeDialogWindow'

import SignupSchemaFormRegistrate from '../lib/validateFormRegistrate'

import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'

import { FetchRegistrate } from '@/shared/api/registrate/fetchRegistrate'
import { TGeoLocation } from '@/shared/model/types'
import { TFormRegistrate } from '@/shared/model/types/subtypes/Types'
import MiniLoader from '@/shared/ui/loaders/MiniLoader'
import Link from 'next/link'
import { useEffect, useReducer } from 'react'
import { PURPOSE_USE } from '../../../../Server/Service/serviceGeoLocation/model/types/type'
import IconFieldFormRegistrated from './IconFieldFormRegistrated'
import { typeDialog } from '@/shared/ui/dialogWindow/model/Types/Types'

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
	}

	const onSubmit = async () => {
		
		
		setLoader(true)
		if (Object.keys(errors).length) return

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				const { latitude, longitude } = pos.coords

				const dataGeo: Omit<TGeoLocation, 'date' | 'user' | '_id'> = {
					location: {
						latitude,
						longitude,
					},
					process: PURPOSE_USE.registrate,

					safeDeleted: false,
				}
				
				
				const candidateNewAdmin = await FetchRegistrate.registrateOrganization(newUser, dataGeo)
				
				if (candidateNewAdmin.status === 200 && candidateNewAdmin.response === 'OK') {
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

	const {
		handleChange,
		values: newUser,
		errors,
		setErrors,
		initialErrors,
	} = useFormik({
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
									<span className=' cursor-pointer' onClick={() => field.name === 'password' && dispatchVisiblePas()}>
										{field.name === 'password' ? (
											<IconFieldFormRegistrated nameFiled={visiblePas ? 'visiblePassword' : 'password'} />
										) : (
											<IconFieldFormRegistrated nameFiled={field.name as any} />
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
					Вход
				</Link>
			</div>
		</form>
	)
}
