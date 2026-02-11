import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TFormOrder } from '../../model/Types'
import { FaInfoCircle } from 'react-icons/fa'

export default function FormOrder({ permission, order }: TFormOrder) {
	return (
		<Fieldset legend={<FaInfoCircle />} className=' col-span-2'>
			order
		</Fieldset>
	)
}
