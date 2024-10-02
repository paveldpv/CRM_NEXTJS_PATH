'use client'
import { TFieldFormAdminPanel } from './FormAdminPanel'

import { memo, useId, useMemo } from 'react'

import { FaDownload, FaFileUpload } from 'react-icons/fa'
import { IoIosWarning } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

import { NotData } from '@/Types/enums'
import { TRequisites } from '@/Types/subtypes/TRequisites'
import { TFullDataSettingOrganization } from '@/app/[INN]/[PHONE]/main/setting/settingorganization/page'
import Fieldset from '@/containers/Fieldset'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	TextField,
	Tooltip,
} from '@mui/material'
import { FormikErrors } from 'formik'
import { FaArrowCircleDown } from 'react-icons/fa'
import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'
import { formatBytes } from '../../../../function/helpers/formatBytes'

export type TChangeRequisites = {
	defaultData: Partial<TRequisites>
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean
	) => Promise<FormikErrors<TFullDataSettingOrganization>> | Promise<void>
} & Omit<TFieldFormAdminPanel, 'defaultData'>

function ChangeRequisites({
	activeField,
	defaultData,
	handlerChange,
	setFieldValue,
}: TChangeRequisites) {
	const { safeDeleted, srcRequisites, requisitesBank, ...baseRequisites } =
		defaultData

	const arrBaseRequisites = useMemo(() => {
		let arr = []
		for (const key in baseRequisites) {
			let objData = {
				name: `${key}.value`,
				// @ts-ignore: error message
				title: baseRequisites[key]?.title,
				// @ts-ignore: error message
				value: baseRequisites[key]?.value,
			}
			arr.push(objData)
		}
		return arr
	}, [baseRequisites])

	const arrBankRequisites = useMemo(() => {
		let arr = []
		for (const key in requisitesBank) {
			let objData = {
				name: `${key}.value`,
				title: requisitesBank[key].title,
				value: requisitesBank[key].value?.toString(),
			}
			arr.push(objData)
		}
		return arr
	}, [requisitesBank])

	const missingSrcRequisites = useMemo(() => {
		return srcRequisites === 'NOT_FOUND'
	}, [srcRequisites])

	const missingDataRequisites = useMemo(() => {
		const missingBankRequisites = arrBankRequisites.find(
			(el) => el.value === NotData.notStringData
		)
		if (missingBankRequisites) {
			return true
		}
		const missingBaseRequisites = arrBaseRequisites.find(
			(el) => el.value === NotData.notStringData
		)
		if (missingBaseRequisites) {
			return true
		}
	}, [arrBankRequisites, arrBaseRequisites])

	const idInput = useId()

	return (
		<Fieldset>
			<ul className=' flex gap-2'>
				<li>
					{missingDataRequisites && (
						<Tooltip
							title={`отсутствуют  данные`}
							className='  text-2xl text-red-400 w-9'
						>
							<span>
								<IoIosWarning />
							</span>
						</Tooltip>
					)}
				</li>
				<li>
					{missingSrcRequisites && (
						<Tooltip
							title={'не прикреплены реквизиты'}
							className='  text-2xl text-red-400'
						>
							<span>
								<FaFileUpload />
							</span>
						</Tooltip>
					)}
				</li>
			</ul>
			<ul className=' flex flex-col gap-2'>
				<Accordion>
					<AccordionSummary
						expandIcon={
							<p className=' text-2xl'>
								<FaArrowCircleDown />
							</p>
						}
					>
						<h5 className=' underline font-bold'>Реквизиты</h5>
					</AccordionSummary>
					<AccordionDetails className=' p-4 flex flex-col gap-2'>
						{arrBaseRequisites.map((item, index) => (
							<TextField
								error={NotData.notStringData === item.value}
								key={index}
								{...styleTextFiled}
								defaultValue={item.value}
								disabled={activeField}
								fullWidth
								multiline
								onChange={handlerChange}
								placeholder={item.title}
								name={item.name}
								label={item.title}
							/>
						))}
					</AccordionDetails>
				</Accordion>
				<hr />
				<Accordion>
					<AccordionSummary
						expandIcon={
							<p className=' text-2xl'>
								<FaArrowCircleDown />
							</p>
						}
					>
						<h5 className=' underline font-bold'>Банковские реквизиты</h5>
					</AccordionSummary>
					<AccordionDetails className=' p-4 flex flex-col gap-2 border-b border-menu_color border-2 pb-4'>
						{arrBankRequisites.map((item, index) => (
							<TextField
								error={NotData.notStringData === item.value}
								key={index}
								{...styleTextFiled}
								defaultValue={item.value}
								disabled={activeField}
								fullWidth
								multiline
								onChange={handlerChange}
								placeholder={item.title}
								name={item.name}
								label={item.title}
							/>
						))}
					</AccordionDetails>
				</Accordion>
				{missingSrcRequisites ? (
					<></>
				) : (
					// <InputFile setFieldValue={setFieldValue} />
					<div>
						<button className=' text-2xl text-highlight_three p-2'>
							<MdDelete />
						</button>
						<Tooltip
							className=' text-highlight_three text-2xl p-2'
							title={
								srcRequisites !== NotData.notFile
									? formatBytes(srcRequisites?.size)
									: ''
							}
						>
							<a
								href={
									srcRequisites !== NotData.notFile
										? srcRequisites?.FullPath
										: ''
								}
								download
							>
								<FaDownload />
							</a>
						</Tooltip>
					</div>
				)}
			</ul>
		</Fieldset>
	)
	// }
}

/**
 * update,viewing and redaction data:
 *
 * - requisites and requisites bank
 *
 * - auto fill data(drag and drop event)
 *
 * - memo function
 */

export default memo(ChangeRequisites)
