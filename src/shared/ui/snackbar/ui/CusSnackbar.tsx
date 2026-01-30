'use client'
import { notification } from 'antd'
import { useCusSnackbar } from '../model/useSnackbar.store'
import { useEffect } from 'react'

export default function CusSnackbar() {
	const [open, autoHidden, children, setOpen] = useCusSnackbar((state) => [
		state.open,
		state.autoHidden,
		state.children,
		state.setOpen,
	])

	useEffect(() => {
		if (open && children) {
			notification.open({
				message: children,
				duration: autoHidden ? 5 : 0,
				onClose: () => setOpen(false),
				placement: 'bottomLeft', 
			})
		}
	}, [open, children, autoHidden, setOpen])

	return null
}