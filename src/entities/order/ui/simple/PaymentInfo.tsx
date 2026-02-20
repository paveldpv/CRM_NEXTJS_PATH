import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TOrderFullInfoDTO, type_payment } from '@/shared/model/types'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { Checkbox, InputNumber, Select } from 'antd'
import { useFormikContext } from 'formik'
import { FaMoneyBillWave } from 'react-icons/fa'


export default function PaymentInfo({ permission }: { permission: boolean }) {
	const { values, setFieldValue } = useFormikContext<TOrderFullInfoDTO>()
	const { payment } = values

	return (
		<Fieldset legend={<FaMoneyBillWave />} className='h-full'>
			<CusConfigProvider>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col'>
						<label className='text-xs text-gray-500'>Тип оплаты</label>
						<Select
							value={payment?.type}
							onChange={(val) => setFieldValue('payment.type', val)}
							disabled={!permission}
							options={[
								{ value: type_payment.cash, label: 'Наличные' },
								{ value: type_payment.vat, label: 'С НДС' },
								{ value: type_payment.no_vat, label: 'Без НДС' },
							]}
							className='w-full'
						/>
					</div>

					<div className='flex flex-col'>
						<label className='text-xs text-gray-500'>Общая стоимость</label>
						<InputNumber
							value={payment?.price}
							onChange={(val) => setFieldValue('payment.price', val)}
							disabled={!permission}
							className='w-full'
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
							parser={(value) => value ? Number(value.replace(/\s/g, '')) : 0}
						/>
					</div>

					<div className='flex flex-col'>
						<label className='text-xs text-gray-500'>Внесено</label>
						<InputNumber
							value={payment?.payment}
							onChange={(val) => setFieldValue('payment.payment', val)}
							disabled={!permission}
							className='w-full'
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
							parser={(value) => value ? Number(value.replace(/\s/g, '')) : 0}
						/>
					</div>

					<div className='flex items-center gap-2 mt-2'>
						<Checkbox
							checked={payment?.paymentStatus}
							onChange={(e) => setFieldValue('payment.paymentStatus', e.target.checked)}
							disabled={!permission}
						/>
						<label className='text-sm'>Оплачено полностью</label>
					</div>
				</div>
			</CusConfigProvider>
		</Fieldset>
	)
}
