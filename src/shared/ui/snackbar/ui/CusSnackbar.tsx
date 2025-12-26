'use client'

import { Snackbar } from '@mui/material'
import { useCusSnackbar } from '../model/useSnackbar.store'
import { useSession } from 'next-auth/react'

export default function CusSnackbar() {
	const [open, autoHidden, children, setOpen] = useCusSnackbar((state) => [
		state.open,
		state.autoHidden,
		state.children,
		state.setOpen,
	])

	
	return (
		<Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={autoHidden ? 5000 : null}>
			<div>{children}</div>
		</Snackbar>
	)
}
