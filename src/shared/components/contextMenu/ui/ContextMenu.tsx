'use client'
import { motion } from 'framer-motion'
import React, { memo } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { Dropdown, Button } from 'antd'
import type { MenuProps, ButtonProps } from 'antd'

type TItemMenu = {
	title: string | React.ReactNode
	onClickFunc: (e?: any) => void
}

type TContextMenu = {
	itemsMenu: TItemMenu[]
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const ContextMenu = React.forwardRef(
	({ itemsMenu, type, ...props }: TContextMenu, ref: React.ForwardedRef<HTMLButtonElement>) => {
		const [open, setOpen] = React.useState(false)

		const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			// Вызываем оригинальный onClick из props, если он есть
			if (props.onClick) {
				props.onClick(e)
			}
			setOpen(!open)
		}

		const handleClose = () => {
			setOpen(false)
		}

		// Преобразуем itemsMenu в формат AntD Menu
		const menuItems: MenuProps['items'] = itemsMenu.map((item, index) => ({
			key: index.toString(),
			label: item.title,
			onClick: (e: any) => {
				item.onClickFunc(e)
				handleClose()
			},
		}))

		// Разделяем HTML атрибуты и AntD Button props
		const {
			className,
			style,
			disabled,
			title: buttonTitle,
			onClick,
			...restProps
		} = props

		// Конфигурация кнопки AntD
		const buttonProps: ButtonProps = {
			type: 'text' as const, // AntD тип кнопки
			onClick: handleClick,
			className: `p-0 border-none bg-transparent shadow-none hover:bg-transparent ${className || ''}`,
			style,
			disabled,
			title: buttonTitle,
			...restProps as any, // Остальные HTML атрибуты
		}

		return (
			<Dropdown
				menu={{ items: menuItems }}
				open={open}
				onOpenChange={(visible) => setOpen(visible)}
				trigger={['click']}
				placement="bottomRight"
			>
				<Button 
					{...buttonProps}
					ref={ref}
				>
					{open ? (
						<motion.span
							key="close"
							initial={{ opacity: 1 }}
							animate={{ opacity: 1, rotate: 0 }}
							exit={{ opacity: 0, rotate: 360 }}
							transition={{ ease: 'easeOut', duration: 0.5 }}
						>
							<IoMdClose />
						</motion.span>
					) : (
						<motion.span
							key="menu"
							initial={{ opacity: 1 }}
							animate={{ opacity: 1, rotate: 0 }}
							exit={{ opacity: 0, rotate: 360 }}
							transition={{ ease: 'easeOut', duration: 1 }}
						>
							<CiMenuKebab />
						</motion.span>
					)}
				</Button>
			</Dropdown>
		)
	}
)

ContextMenu.displayName = 'ContextMenu'

export default memo(ContextMenu)