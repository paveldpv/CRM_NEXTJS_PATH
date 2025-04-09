import { AccordionSummaryOwnProps } from '@mui/material'
import { AccordionProps } from '@mui/material/Accordion'
import { ReactNode } from 'react'

export type TCusAccordion = {
	titleAccordion:string|ReactNode|number
	
} & AccordionProps