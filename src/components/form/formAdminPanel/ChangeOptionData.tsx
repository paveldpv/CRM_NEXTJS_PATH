import { Tooltip } from '@mui/material'
import TextField from '@mui/material/TextField'
import { FaPowerOff } from 'react-icons/fa'
import { FaCopy, FaTelegram } from 'react-icons/fa6'
import { TFieldFormAdminPanel } from './FormAdminPanel'

import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'

import Fieldset from '@/containers/Fieldset'
import React from 'react'
import { useDialogWindow } from '../../../../store/storeDialogWindow'

export type TChangeOptionData = { INN: string } & TFieldFormAdminPanel

/**
 * update,viewing and redaction data:
 *
 * - settings telegram
 *
 * - settings email
 *
 * - href prev calc page
 */

export default function ChangeOptionData({
	activeField,
	defaultData,
	handlerChange,
	INN,
}: TChangeOptionData) {
	const { telegram, paramsEmailNewsletter, ...otherOption } = defaultData
	const [setOpenDialogWindow] = useDialogWindow((state) => [state.setOpen])

	const copyHrefPrevCalc = async (e: React.MouseEvent) => {
		e.preventDefault()
		const host = window.location.host

		const hrefPrevCalc = `${host}/${INN}/prevCalc`

		await navigator.clipboard.writeText(hrefPrevCalc)
		setOpenDialogWindow(true, { title: 'скопировано' })
		setTimeout(() => setOpenDialogWindow(false), 500)
	}

	return (
		<Fieldset legend='Доп.параметры'>
			<div className='flex flex-col gap-2'>
				<TextField
					disabled
					placeholder='id телеграм бота'
					{...styleTextFiled}
				/>
				{activeField && telegram?.hrefChat !== 'не задан' ? (
					<div className=' flex' >
						<a href={telegram?.hrefChat} target='_blank' className=' text-xl'>
							<FaTelegram />
						</a>
						<Tooltip title={telegram?.botOn ? 'Бот активен' : 'Бот отключен'}>
							<button>
								<FaPowerOff className=' bg-red-500 text-red-600'/>
							</button>
						</Tooltip>
					</div>
				) : (
					<TextField
						{...styleTextFiled}
						defaultValue={telegram?.hrefChat}
						disabled={activeField}
						name='telegram.hrefChat'
						onChange={handlerChange}
						placeholder='ссылка на профиль телеграмма'
						label='ссылка на профиль телеграмма'
					/>
				)}
				<hr className=' h-1 bg-menu_color' />
				<TextField
					{...styleTextFiled}
					className=' '
					defaultValue={paramsEmailNewsletter?.email}
					disabled={activeField}
					name='paramsEmailNewsletter.email'
					onChange={handlerChange}
					placeholder='почта для отправки писем'
					label='почта для отправки писем'
				/>
				<TextField
					{...styleTextFiled}
					defaultValue={paramsEmailNewsletter?.password}
					disabled={activeField}
					name='paramsEmailNewsletter.password'
					onChange={handlerChange}
					placeholder='пароль от почты'
					label='пароль от почты'
				/>
				<hr className=' h-1 bg-menu_color' />
				<div className='grid grid-cols-4 gap-3'>
					<a
						href={`/${INN}/prevCalc`}
						target='_blank'
						className='  col-span-3 text-center text-md text-menu_color style_border p-2   hover:text-color_header  hover:border-color_header duration-75'
					>
						страница предварительного расчета
					</a>
					<Tooltip title='скопировать'>
						<button
							onClick={copyHrefPrevCalc}
							className=' flex justify-center items-center text-2xl text-menu_color p-2 style_border  hover:text-color_header  hover:border-color_header duration-75 '
						>
							<FaCopy />
						</button>
					</Tooltip>
				</div>
			</div>
		</Fieldset>
	)
}
