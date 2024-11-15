'use client'
import { TFieldFormAdminPanel } from './FormAdminPanel'

import { memo, useMemo } from 'react'

import { TFullDataSettingOrganization } from '@/app/[INN]/[PHONE]/main/setting/settingorganization/page'
import Fieldset from '@/containers/Fieldset'
import FileUpload from '@/shared/components/fileUpload/ui/FileUpload'
import { NotData } from '@/shared/model/types/enums'
import { TRequisites } from '@/shared/model/types/subtypes/TRequisites'
import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material'
import { FormikErrors } from 'formik'
import { FaArrowCircleDown } from 'react-icons/fa'
import { styleTextFiled } from '../../../../config/muiCustomStyle/textField'
import LabelRequisites from './LabelRequisites'

export type TChangeRequisites = {
	values: Omit<TFullDataSettingOrganization, 'admins'>
	defaultData: Partial<TRequisites>
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean
	) => Promise<FormikErrors<TFullDataSettingOrganization>> | Promise<void>
} & Omit<TFieldFormAdminPanel, 'defaultData'>

function ChangeRequisites({ activeField, defaultData, handlerChange, setFieldValue, values }: TChangeRequisites) {
	const { safeDeleted, srcRequisites, requisitesBank, ...baseRequisites } = defaultData

	const arrBaseRequisites = useMemo(() => {
		let arr = []
		for (const key in baseRequisites) {
			let objData = {
				name: `dataRequisites.${key}.value`,
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
				name: `dataRequisites.requisitesBank.${key}.value`,
				title: requisitesBank[key].title,
				value: requisitesBank[key].value?.toString(),
			}
			arr.push(objData)
		}
		return arr
	}, [requisitesBank])

	const missingSrcRequisites = useMemo(() => {
		return values.dataRequisites.srcRequisites === 'NOT_FOUND'
	}, [values])

	const missingDataRequisites = useMemo(() => {
		const missingBankRequisites = arrBankRequisites.find((el) => el.value === NotData.notStringData)
		if (missingBankRequisites) {
			return true
		}
		const missingBaseRequisites = arrBaseRequisites.find((el) => el.value === NotData.notStringData)
		if (missingBaseRequisites) {
			return true
		}
		return false
	}, [arrBankRequisites, arrBaseRequisites])

	return (
		<Fieldset
			legend={
				<LabelRequisites
					missingDataRequisites={missingDataRequisites}
					missingSrcRequisites={missingSrcRequisites}
				/>
			}
			className=' col-span-2'
		>
			<ul className=' flex flex-col gap-2'>
				<Accordion className='border-2 border-solid border-menu_color p-2  rounded-md'>
					<AccordionSummary
						expandIcon={
							<span className=' text-2xl text-color_header'>
								<FaArrowCircleDown />
							</span>
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
								disabled={activeField || item.title === 'ИНН'}
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
				<Accordion className='border-2 border-solid border-menu_color p-2  rounded-md'>
					<AccordionSummary
						expandIcon={
							<p className=' text-2xl text-color_header'>
								<FaArrowCircleDown />
							</p>
						}
					>
						<h5 className=' underline font-bold'>Банковские реквизиты</h5>
					</AccordionSummary>
					<AccordionDetails className=' p-4 flex flex-col gap-2  pb-4'>
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
				<FileUpload
					tooltipTitle='Добавьте реквизиты'
					set={setFieldValue}
					src={srcRequisites}
					nameFiled='dataRequisites.srcRequisites'
				/>
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
 *
 * - memo function
 */

export default memo(ChangeRequisites)
