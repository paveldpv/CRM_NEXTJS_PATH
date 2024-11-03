'use client'
import ItemsEmployee from '@/components/items/ItemsEmployee'

import { TPanelRuleEmployee } from '@/components/rulePanels/PanelRuleEmployee'
import HorizonLoader from '@/components/UI/Loaders/PropsRuleLoaders/HorizonLoader'
import { TParamsAllEmployee } from '../../service/user/getEmployee'
import { TEmployees } from './Employees'
import Fieldset from './Fieldset'

type TListEmployee = { visibleLoader: boolean;  } & Pick<
	TEmployees,
	'dataEmployees'
> &
	TPanelRuleEmployee

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
			<Fieldset legend='Сотрудники' className='  flex items-center justify-center'>
				<HorizonLoader visible={visibleLoader} />
			</Fieldset>
		)
	} else {
		return (
			<Fieldset legend='Сотрудники'>
				<div>
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
				</div>
			</Fieldset>
		)
	}
}
