import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { Checkbox } from 'antd'
import { FaInfoCircle } from 'react-icons/fa'
import { TFormOrder } from '../../model/Types'
import GeneralInfo from '../simple/GeneralInfo'
import PaymentInfo from '../simple/PaymentInfo'
import TooltipAcceptOfCargoEmployee from '../simple/TooltipAcceptOfCargoEmployee'

export default function FormOrder({ permission, order, setOrderData }: TFormOrder) {
	return (
		<Fieldset legend={order ? `№:${order?.numberOrder}` : <FaInfoCircle />} className=' col-span-2'>
			{order && (
				<div className=' flex justify-between border-b border-gray-500 w-full m-2 '>
					<div className='flex gap-2 justify-start'>
						<label className='block text-sm mb-1'>Выполнено</label>
						<Checkbox checked={order.complied} disabled={!permission} />
					</div>
					<div>
						{order.acceptedOfCargoEmployeeId && <TooltipAcceptOfCargoEmployee {...order.acceptedOfCargoEmployeeId} />}
					</div>
				</div>
			)}

			<div className=' grid grid-cols-3 gap-2'>
				<GeneralInfo {...order?.service} />
				<PaymentInfo {...order?.payment} />
			</div>
			
		</Fieldset>
	)
}
