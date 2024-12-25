import { create } from 'zustand'
import { TFieldDialog } from '../types/TypeFiledDialog'

export const useFieldDialog = create<TFieldDialog>((set) => ({
	open: false,
	dispatchFn: () => {
		set({ open: false })
	},

	dataDialog: undefined,
	setOpen: (args) => {
		if (!args) set({ open: args, dataDialog: undefined })
		else
			set({
				open: args.state,
				dispatchFn: args.dispatchFn,
				onCloseDispatchFn: args.onCloseDispatchFn,
				dataDialog: args.dataDialog,
			})
	},
}))
