'use client'

import PanelRuleEmployee from '@/components/rulePanels/PanelRuleEmployee'
import { TWithoutPassUser } from '@/Types/Types'
import { useEffect, useState } from 'react'
import { TParamsAllEmployee } from '../../service/user/getEmployee'
import LeftSlider from './LeftSlider'
import ListEmployee from './ListEmployee'
import FormCardEmployee from '@/components/form/formCarEmployee/FormCardEmployee'

export type TEmployees = {
	dataEmployees: TWithoutPassUser[]
}

export default function Employees({ dataEmployees }: TEmployees) {
	const [employees, setEmployees] = useState<TWithoutPassUser[] | []>([])
	const [visibleLoader, setVisibleLoader] = useState(true)
	const [visibleCardEmployee, setVisibleCardEmployee] = useState<boolean>(false)
	const [redactProfile, setRedactProfile] = useState<TWithoutPassUser | null>(null)
	const [visibleAllEmployee, setVisibleAllEmployee] = useState<TParamsAllEmployee>(0)

	useEffect(() => {
		setEmployees(dataEmployees)
		setVisibleLoader(false)
	}, [])

	return (
		<div className=' relative '>
			<PanelRuleEmployee
				setEmployee={setEmployees}
				
				setVisibleCardEmployee={setVisibleCardEmployee}
				setRedactProfile={setRedactProfile}
				setVisibleLoader={setVisibleLoader}
			/>
			<ListEmployee			
				setVisibleLoader={setVisibleLoader}
				setEmployee={setEmployees}
				
				setRedactProfile={setRedactProfile}
				dataEmployees={employees}
				visibleLoader={visibleLoader}
				setVisibleCardEmployee={setVisibleCardEmployee}
			/>

			<LeftSlider visibleSlider={visibleCardEmployee} className='  absolute top-10 z-50  w-1/2 p-4'>
				<FormCardEmployee
					setVisibleLoader={setVisibleLoader}					
					key={'leftPanel'}
					setVisibleCardEmployee={setVisibleCardEmployee}
					dataEmployee={redactProfile}
					setEmployees={setEmployees}
				/>
			</LeftSlider>
		</div>
	)
}
