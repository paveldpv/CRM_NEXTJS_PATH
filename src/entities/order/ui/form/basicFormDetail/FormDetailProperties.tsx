'use client'

import { Select, Tooltip } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { FaQuestionCircle } from 'react-icons/fa'
import { FormikValues } from 'formik'
import { TFormDetailProperties } from '@/entities/order/model/Types'



export default function FormDetailProperties({
	values,
	setFieldValue,
	propertyDetail,
}: TFormDetailProperties) {
	return (
		<div className="grid grid-cols-2 gap-4 mt-4">
			<div className="flex flex-col gap-1">
				<label className="text-xs font-bold">Свойства детали</label>
				<Select
					options={propertyDetail}
					mode="tags"
					style={{ width: '100%' }}
					placeholder="Добавьте свойства"
					value={values.propertyDetail}
					onChange={(val) => setFieldValue('propertyDetail', val)}
				/>
				<Tooltip title="Процесс обработки детали">
					<span>
						<FaQuestionCircle className="ml-2 text-lg" />
					</span>
				</Tooltip>
			</div>
		</div>
	)
}