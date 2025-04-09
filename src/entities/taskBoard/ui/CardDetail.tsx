import CusButton from '@/shared/ui/CusButton'
import { useEffect, useState } from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'
import { TCardDetails } from '../model/Types'

export default function CardDetail({ data, employees }: TCardDetails) {
	
	const { id, description, files, payment } = data
	const [assignEmployees, setAssignEmployees] = useState<string[]>([])
	const addTask = () => {}
	return (
		<div>
			<p className=' opacity-50 text-xs'>id:{id}</p>
			<p>описание детали:</p>
			<ul>
				{description.map((data, index) => (
					<li key={index}>{data}</li>
				))}
			</ul>
			<hr />
			<CusButton className=' w-10 h-10  rounded-full border-2 border-dashed border-text_navigate_menu'>
				<FaPlus />
			</CusButton>
			<hr />

			<CusButton onClick={addTask}>
				<FaRegCheckCircle />
			</CusButton>
		</div>
	)
}
