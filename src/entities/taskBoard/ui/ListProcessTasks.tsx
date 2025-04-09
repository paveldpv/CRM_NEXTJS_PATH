import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { TListTasks } from '../model/Types'

export default function ListProcessTasks({
	dataOrder,
	setDataOrder,
	dataTask,
	setDataTask,
}: TListTasks) {
	if(dataTask?.length===0){
		return <p> нет задач </p>
 	}
	else{
		return <Fieldset title='Текущие' className=''>das</Fieldset>
	}
}
