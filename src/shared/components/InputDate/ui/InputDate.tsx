import { useState } from 'react'
import DatePicker from 'tailwind-datepicker-react'
import options from './model/_option'
import { TInputDate } from './model/types'

export default function InputDate({
	title = 'Дата',
	name = 'date',
	currentDate = '2022-01-01',
	setFieldValue,
}: TInputDate) {
	const [show, setShow] = useState(false)

	const handleClose = (state: boolean) => {
		setShow(state)
	}
	if (setFieldValue) {
		return (
			<div>
				<DatePicker
					options={{
						...options,
						title,
						inputNameProp: name,
						defaultDate: new Date(currentDate),
					}}
					onChange={(val) => {
						setFieldValue && setFieldValue(name, val)
					}}
					show={show}
					setShow={handleClose}
				/>
			</div>
		)
	} else {
		const dateBirthday = new Date(currentDate)
		return (
			<div>
				<span>{dateBirthday.getFullYear()}</span>
				<span>{}</span>
			</div>
		)
	}
}
