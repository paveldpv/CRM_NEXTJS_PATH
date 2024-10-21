'use client'
import CardEmployee from '@/components/items/CardEmployee'
import PanelRuleEmployee from '@/components/rulePanels/PanelRuleEmployee'
import { TWithoutPassUser } from '@/Types/Types'
import { useEffect, useState } from 'react'
import LeftSlider from './LeftSlider'
import ListEmployee from './ListEmployee'

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
	}, [employees])
	return (
		<div className=' relative '>
			<PanelRuleEmployee setVisibleCardEmployee={setVisibleCardEmployee} setRedactProfile={setRedactProfile} />
			<ListEmployee
				setRedactProfile={setRedactProfile}
				dataEmployees={employees}
				visibleLoader={visibleLoader}
				setVisibleCardEmployee={setVisibleCardEmployee}
			/>
			
				<LeftSlider visibleSlider={visibleCardEmployee} className='  absolute top-10 z-50  w-1/2 p-4'>
					<CardEmployee
						key={'leftPanel'}
						setVisibleCardEmployee={setVisibleCardEmployee}
						dataEmployee={redactProfile}
					/>
				</LeftSlider>
			
			{/* <AnimatePresence>
				{visibleCardEmployee && (
					<CardEmployee key={'leftPanel'} setVisibleCardEmployee={setVisibleCardEmployee} dataEmployee={redactProfile} />
				)}
			</AnimatePresence> */}
		</div>
	)
}
