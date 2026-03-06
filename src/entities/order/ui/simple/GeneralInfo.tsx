import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TOrderFullInfoDTO } from '@/shared/model/types'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { DatePicker, Input } from 'antd'
import dayjs from 'dayjs'
import { useFormikContext } from 'formik'
import { BsMotherboard } from 'react-icons/bs'
import { FaCar } from 'react-icons/fa'

export default function GeneralInfo({ permission }: { permission: boolean }) {
	const { values, setFieldValue } = useFormikContext<TOrderFullInfoDTO>()
	const { service } = values

	return (
		<Fieldset legend={<BsMotherboard />} className='h-full col-span-2 w-full'>
			<CusConfigProvider>
				<div className='flex flex-col gap-4'>
					<div className='grid grid-cols-2 gap-2'>
						<div className='flex flex-col'>
							<label className='text-xs '>Дата начала</label>
							<DatePicker
								value={service.deadlines?.startDate ? dayjs(service.deadlines.startDate) : null}
								onChange={(date) => setFieldValue('service.deadlines.startDate', date ? date.toDate() : null)}
								disabled={true}
								className='w-full'
							/>
						</div>
						<div className='flex flex-col'>
							<label className='text-xs '>Дата окончания заказа</label>
							<DatePicker
								placeholder='Дата окончания'
								value={service.deadlines?.endDate ? dayjs(service.deadlines.endDate) : null}
								onChange={(date) => setFieldValue('service.deadlines.endDate', date ? date.toDate() : null)}
								disabled={!permission}
								className='w-full'
							/>
						</div>
					</div>

					<div className='border-t pt-2'>
						<p className='text-sm font-semibold mb-2'>Данные доставки</p>
						<div className='flex flex-col mb-3'>
							<label className='text-xs '>Дата доставки</label>
							<DatePicker
								placeholder='Дата доставки'
								value={service.delivered?.dateDelivered ? dayjs(service.delivered.dateDelivered) : null}
								onChange={(date) => setFieldValue('service.delivered.dateDelivered', date ? date.toDate() : null)}
								disabled={!permission}
								className='w-full'
							/>
						</div>
						<div className='flex flex-col mb-3'>
							<label className='text-xs  w-1/2 '>Номер машины (А986АА62)</label>
							<Input
								maxLength={7}
								value={service.delivered?.car?.number || ''}
								onChange={(e) => {
									if (!service.delivered?.car) {
										setFieldValue('service.delivered.car', { number: e.target.value.toUpperCase() })
									} else {
										setFieldValue('service.delivered.car.number', e.target.value.toUpperCase())
									}
								}}
								disabled={!permission}
								prefix={<FaCar className='text-gray-400' />}
								placeholder='А986АA62'
							/>
						</div>{' '}
						<div className='grid grid-cols-2 gap-2'>
							<div className='flex flex-col'>
								<label className='text-xs '>Имя водителя</label>
								<Input
									value={service.delivered?.car?.driver?.name}
									onChange={(e) => setFieldValue('service.delivered.car.driver.name', e.target.value)}
									disabled={!permission}
									placeholder='Имя'
								/>
							</div>
							<div className='flex flex-col'>
								<label className='text-xs '>Фамилия водителя</label>
								<Input
									value={service.delivered?.car?.driver?.lastName}
									onChange={(e) => setFieldValue('service.delivered.car.driver.lastName', e.target.value)}
									disabled={!permission}
									placeholder='Фамилия'
								/>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-2 mt-2'>
							<div className='flex flex-col'>
								<label className='text-xs '>Отчество водителя</label>
								<Input
									value={service.delivered?.car?.driver?.surName}
									onChange={(e) => setFieldValue('service.delivered.car.driver.surName', e.target.value)}
									disabled={!permission}
									placeholder='Отчество'
								/>
							</div>
							<div className='flex flex-col'>
								<label className='text-xs '>Телефон</label>
								<Input
									value={service.delivered?.car?.driver?.phone}
									onChange={(e) => setFieldValue('service.delivered.car.driver.phone', e.target.value)}
									disabled={!permission}
									placeholder='Телефон'
								/>
							</div>
						</div>
						<div className='flex flex-col mt-2'>
							<label className='text-xs '>Прочие данные</label>
							<Input.TextArea
								value={service.delivered?.car?.driver?.otherData}
								onChange={(e) => setFieldValue('service.delivered.car.driver.otherData', e.target.value)}
								disabled={!permission}
								placeholder='Дополнительная информация'
								rows={2}
							/>
						</div>
					</div>
				</div>
			</CusConfigProvider>
		</Fieldset>
	)
}
