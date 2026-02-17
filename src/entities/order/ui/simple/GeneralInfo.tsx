import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TServiceOrder } from '@/shared/model/types'
import { DatePicker, Input } from 'antd'
import { BsMotherboard } from 'react-icons/bs'

export default function GeneralInfo(props: Partial<TServiceOrder>) {
	return (
		<Fieldset legend={<BsMotherboard />}>
			<div className='w-full flex'>
				deadLines
				<DatePicker />
				startDate
				<DatePicker />
				endDate
			</div>
			<div>
				<p>данные водителя</p>
				<DatePicker />
				dateDelivered
				<div>
					<label>номер машины</label>
					<Input value={props.delivered?.car.number} /> номер машины
				</div>
				<div>
					<label>имя вод.</label>
					<Input value={props.delivered?.car.driver?.name} /> имя водителя
				</div>
				<Input  /> Фамилия водителя
				<Input /> Отчество водителя
				<Input /> прочее данные
			</div>
		</Fieldset>
	)
}
