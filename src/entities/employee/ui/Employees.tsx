'use client'

import { useEffect, useState } from 'react'


import LeftSlider from '../../../shared/components/leftSlider/ui/LeftSlider'
import FormCardEmployee from './FormCardEmployee'
import ListEmployee from './ListEmployee'
import PanelRuleEmployee from './PanelRuleEmployee'
import { TUserDTOWithoutPas } from '@/shared/model/types'

export type TEmployees = {
	dataEmployees: TUserDTOWithoutPas[]
}

export default function Employees({ dataEmployees }: TEmployees) {
	const [employees, setEmployees] = useState<TUserDTOWithoutPas[] | []>([])
	const [visibleLoader, setVisibleLoader] = useState(true)
	const [visibleCardEmployee, setVisibleCardEmployee] = useState<boolean>(false)
	const [redactProfile, setRedactProfile] = useState<TUserDTOWithoutPas | null>(null)

	useEffect(() => {
		//TODO:
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
