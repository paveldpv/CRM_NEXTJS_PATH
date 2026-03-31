import { create } from 'zustand'
import { TCusSnackbar, TParamsOpenSnackbar, TSnackbarMessage } from './types'

export const useCusSnackbar = create<TCusSnackbar & { addSnackbar: (message: TSnackbarMessage) => void }>((set, get) => ({
	open: false,
	children: null,
	autoHidden: false,
	setOpen: (params: TParamsOpenSnackbar) => {
		if (typeof params === 'boolean') {
			set({ open: params })
		} else {
			set({
				open: params.open, autoHidden: params.autoHidden
			})
		}
	},
	setChildren: (data) => {
		set({ children: data })
	},
	addSnackbar: (message: TSnackbarMessage) => {
		set({
			children: message.message,
			open: true,
			autoHidden: true
		});
		// Auto-close after duration based on severity
		const duration = message.severity === 'error' ? 10000 : 5000;
		setTimeout(() => {
			if (get().open && get().children === message.message) {
				set({ open: false });
			}
		}, duration);
	}
}))