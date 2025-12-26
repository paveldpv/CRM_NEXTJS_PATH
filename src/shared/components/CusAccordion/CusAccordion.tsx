'use client'
import { Accordion, AccordionSummary } from '@mui/material'
import { FaArrowCircleDown } from 'react-icons/fa'
import { TCusAccordion } from './model/Types'

export default function CusAccordion({ titleAccordion, ...props }: TCusAccordion) {
	return (
		<Accordion {...props} >
			<AccordionSummary
				expandIcon={
					<span className=' text-2xl text-color_header'>
						<FaArrowCircleDown />
					</span>
				}
			>
				{titleAccordion}
			</AccordionSummary>
			{props.children}
		</Accordion>
	)
}
