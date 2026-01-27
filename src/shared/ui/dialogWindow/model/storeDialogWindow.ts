import { create } from 'zustand'
import { TDialogWindow, typeDialog } from './Types/Types'

export const useDialogWindow = create<TDialogWindow>((set) => ({
	open: false,
	type: typeDialog.default,
	response: false,
	dispatchFn: null,
	setOpen: (state, dataDialog, type) => {
		if (state) set({ open: state, dataDialog, type })
		else set({ open: state, dataDialog: undefined, type: typeDialog.default })
	},
	setDispatchFn: (state: any) => {
		//?setDispatchFn(() => testFo(`test`));функция передается колбеком
		//? работают асинхроные функции
		set({ dispatchFn: state })
	},
}))
