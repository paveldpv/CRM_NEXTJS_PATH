import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TPaymentOrder } from '@/shared/model/types'
import { FaMoneyBillWave } from 'react-icons/fa'

type Props = {}

export default function PaymentInfo(props: Partial<TPaymentOrder>) {
	return (
		<Fieldset legend={<FaMoneyBillWave />}>
			<div></div>
		</Fieldset>
	)
}
