'use client'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TOrderFullInfoDTO } from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { Checkbox } from 'antd'
import { useFormikContext } from 'formik'
import { FaCheck, FaInfoCircle } from 'react-icons/fa'
import { TFormOrder } from '../../model/Types'
import GeneralInfo from '../simple/GeneralInfo'
import PaymentInfo from '../simple/PaymentInfo'
import TooltipAcceptOfCargoEmployee from '../simple/TooltipAcceptOfCargoEmployee'

export default function FormOrder({ permission }: TFormOrder) {
	const { values, setFieldValue, handleSubmit } = useFormikContext<TOrderFullInfoDTO>()

	if (!values?.CounterParty || Object.keys(values?.CounterParty).length === 0) {
		return (
			<Fieldset legend={<FaInfoCircle />} className=' col-span-2'>
				<div className='flex items-center justify-center h-full text-gray-400'>
					<p>Выберите контрагента для заполнения данных заказа</p>
				</div>
			</Fieldset>
		)
	}

	return (
		<Fieldset
			legend={values.numberOrder ? `№:${values.numberOrder}` : <FaInfoCircle />}
			className=' col-span-2 relative w-full'
		>
			{values.numberOrder !== 0 && (
				<div className=' flex justify-between border-b border-gray-500 w-full m-2 '>
					<div className='flex gap-2 justify-start'>
						<label className='block text-sm mb-1'>Выполнено</label>
						<Checkbox
							checked={values.complied}
							onChange={(e) => setFieldValue('complied', e.target.checked)}
							disabled={!permission}
						/>
					</div>
					<div>
						{values.acceptedOfCargoEmployeeId && <TooltipAcceptOfCargoEmployee {...values.acceptedOfCargoEmployeeId} />}
					</div>
				</div>
			)}

			<div>
				<div className=' grid grid-cols-3 gap-1 relative '>
					<GeneralInfo permission={permission} />
					<PaymentInfo permission={permission} />
				{permission && (
					<div className=' absolute bottom-5 right-5 '>
						<CusButton className=' rounded-lg' onClick={() => handleSubmit()}>
							<p className=' flex justify-center'>
								<FaCheck className='mr-2' /> <p>Сохранить</p>
							</p>
						</CusButton>
					</div>
				)}
				</div>
			</div>
		</Fieldset>
	)
}
