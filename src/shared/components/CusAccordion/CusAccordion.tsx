'use client'
import { Collapse } from 'antd'

import { CusAccordionProps } from './model/Types'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { FaChevronDown } from 'react-icons/fa'

import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'

const CusAccordion = forwardRef<HTMLDivElement, CusAccordionProps>(
	({ children, defaultActive = false, onToggle, ...props }, ref) => {
		
		const handlerChange = (isOpen: string[]) => {
			if (onToggle) {
				onToggle(isOpen)
			}
		}

		return (
			<CusConfigProvider>
				<Collapse
					onChange={handlerChange}
					ref={ref}
					defaultActiveKey={defaultActive ? ['1'] : []}
					expandIcon={({ isActive }) => (
						<motion.span
							animate={{ rotate: isActive ? 180 : 0 }}
							transition={{ duration: 0.3 }}
							className='inline-flex items-center'
						>
							<FaChevronDown />
						</motion.span>
					)}
					expandIconPlacement='start'
					{...props}
				>
					{children}
				</Collapse>
			</CusConfigProvider>
		)
	}
)

CusAccordion.displayName = 'CusAccordion'

export default CusAccordion
