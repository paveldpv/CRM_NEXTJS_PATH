'use client'
import { Tooltip } from '@mui/material'
import { FaExclamation } from 'react-icons/fa'

export default function ListDescriptionTable({ listDescriptionTable }: { listDescriptionTable: string[] }) {	
		return (
			<Tooltip
			className='  mt-1 '
				title={
					<ul className=' text-xl  '>
						{listDescriptionTable.map((el, index) => (
							<li key={index}>{el}</li>
						))}
					</ul>
				}
			>
				<p className=' text-xl  hover:cursor-pointer  '>
					<FaExclamation />					
				</p>
			</Tooltip>
		)
	
}
