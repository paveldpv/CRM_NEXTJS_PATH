'use client'
import CusButton from '@/shared/ui/CusButton'
import { Menu, MenuItem } from '@mui/material'
import { motion } from 'framer-motion'
import React, { memo, useReducer, useRef } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'

const ContextMenu = React.forwardRef(
	({ itemsMenu, ...props }: TContextMenu, ref: React.ForwardedRef<HTMLButtonElement>) => {
		
		const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
		const open = Boolean(anchorEl);
		const handleClick = (event: React.MouseEvent<HTMLElement>) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		return (
			<>
				<button onClick={handleClick} {...props}  ref={ref}>
					{open ? (
						<motion.span
							initial={{ opacity: 1 }}
							exit={{ opacity: 0, rotate: 360 }}
							transition={{ ease: 'easeOut', duration: 0.5 }}
						>
							<IoMdClose />
						</motion.span>
					) : (
						<motion.span
							initial={{ opacity: 1 }}
							exit={{ opacity: 0, rotate: 360 }}
							transition={{ ease: 'easeOut', duration: 1 }}
						>
							<CiMenuKebab />
						</motion.span>
					)}
				</button>
				<Menu open={open} onClose={handleClose} anchorEl={anchorEl} >
					{itemsMenu.map((item, index) => (
						<MenuItem
							key={index}
							onClick={() => {
								item.onClickFunc()
								handleClose()
							}}
						>
							{item.title}
						</MenuItem>
					))}
				</Menu>
			</>
		)
	}
)

export default memo(ContextMenu)

