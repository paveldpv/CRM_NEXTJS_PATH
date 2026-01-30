'use client'
import { Collapse } from 'antd'
import { FaArrowCircleDown } from 'react-icons/fa'
import type { CollapseProps } from 'antd'

import { TCusAccordion } from './model/Types'




export default function CusAccordion({ 
	titleAccordion, 
	children, 
	className,
	defaultActiveKey,
	activeKey,
	onChange,
	collapsible,
	...props 
}: TCusAccordion) {
	
	
	const collapseProps: CollapseProps = {
		// Основные пропсы
		className: className,
		defaultActiveKey: defaultActiveKey,
		activeKey: activeKey,
		onChange,
		collapsible,
		
		// Кастомная иконка с вращением
		expandIcon: ({ isActive }) => (
			<span 
				className='text-2xl text-color_header'
				style={{ 
					transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
					transition: 'transform 0.3s ease-in-out',
					display: 'inline-flex',
					alignItems: 'center'
				}}
			>
				<FaArrowCircleDown />
			</span>
		),
		
		// Используем items пропс вместо children
		items: [
			{
				key: '1',
				label: titleAccordion,
				children: children,
			}
		],
		
		// Остальные пропсы
		...props,
	}

	return <Collapse {...collapseProps}  />
}