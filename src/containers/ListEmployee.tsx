'use client'
import ItemsEmployee from '@/components/items/ItemsEmployee'

import { TPanelRuleEmployee } from '@/components/rulePanels/PanelRuleEmployee'
import HorizonLoader from '@/components/UI/Loaders/PropsRuleLoaders/HorizonLoader'
import { TEmployees } from './Employees'
import Fieldset from './Fieldset'

type TListEmployee = { visibleLoader: boolean } & Pick<TEmployees, 'dataEmployees'> & TPanelRuleEmployee

export default function ListEmployee({
	visibleLoader,
	dataEmployees,
	setVisibleCardEmployee,
	setRedactProfile,
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
						key={index}
							setRedactProfile={setRedactProfile}
							setVisibleCardEmployee={setVisibleCardEmployee}
							lastName={employee.lastName}
							surname={employee.surname}
							name={employee.name}
							index={index}
							phone={employee.phone}
							INN={employee.INN}
							idUser={employee.idUser}
							email={employee.email}
							linksAllowed={employee.linksAllowed}
							srcPhoto={employee.srcPhoto}
							safeDeleted={false}
						/>
					))}
				</div>
			</Fieldset>
		)
	}
}
