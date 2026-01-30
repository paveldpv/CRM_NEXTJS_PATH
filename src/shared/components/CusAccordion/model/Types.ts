
import { CollapseProps } from 'antd'
import { ReactNode } from 'react'

export type TCusAccordion = {
	titleAccordion: string | ReactNode | number
	children?: ReactNode // Используем стандартное свойство children
} & Omit<CollapseProps, 'items'> // Используем CollapseProps из AntD вместо AccordionProps из MUI
