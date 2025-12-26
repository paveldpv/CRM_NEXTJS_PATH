'use client'

import { useEffect, useState } from 'react'

import { TWithoutPassUser } from '@/shared/model/types/subtypes/Types'
import LeftSlider from '../../../shared/components/leftSlider/ui/LeftSlider'
import FormCardEmployee from './FormCardEmployee'
import ListEmployee from './ListEmployee'
import PanelRuleEmployee from './PanelRuleEmployee'

export type TEmployees = {
	dataEmployees: TWithoutPassUser[]
}

export default function Employees({ dataEmployees }: TEmployees) {
	const [employees, setEmployees] = useState<TWithoutPassUser[] | []>([])
	const [visibleLoader, setVisibleLoader] = useState(true)
	const [visibleCardEmployee, setVisibleCardEmployee] = useState<boolean>(false)
	const [redactProfile, setRedactProfile] = useState<TWithoutPassUser | null>(null)

	useEffect(() => {
		setEmployees(dataEmployees)
		setVisibleLoader(false)
	}, [])

	return (
		<div className='   '>
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

			<LeftSlider visibleSlider={visibleCardEmployee} className='  absolute  top-40  z-50  w-1/2 p-4'>
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
