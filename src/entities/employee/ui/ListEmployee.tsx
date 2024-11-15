'use client'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import HorizonLoader from '@/shared/ui/loaders/PropsRuleLoaders/HorizonLoader'
import { TEmployees } from './Employees'
import ItemsEmployee from './ItemsEmployee'
import { TPanelRuleEmployee } from './PanelRuleEmployee'


type TListEmployee = { visibleLoader: boolean } & Pick<TEmployees, 'dataEmployees'> & TPanelRuleEmployee

export default function ListEmployee({
	visibleLoader,
	dataEmployees,
	setVisibleCardEmployee,
	setRedactProfile,
	setVisibleLoader,
	setEmployee,
}: TListEmployee) {
	if (visibleLoader) {
		return (
			<Fieldset legend='Сотрудники' className='  flex items-center justify-center '>
				<HorizonLoader visible={visibleLoader} />				
			</Fieldset>
		)
	} else {
		return (
			<Fieldset legend='Сотрудники' className=' overflow-hidden    '>				
					
						{dataEmployees.map((employee, index) => (
							<ItemsEmployee
								setEmployee={setEmployee}
								key={index}
								setVisibleLoader={setVisibleLoader}
								setRedactProfile={setRedactProfile}
								setVisibleCardEmployee={setVisibleCardEmployee}
								index={index}
								{...employee}
							/>
						))}
					
				
			</Fieldset>
		)
	}
}
