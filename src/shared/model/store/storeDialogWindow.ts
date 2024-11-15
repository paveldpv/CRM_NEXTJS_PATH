import { typeDialog } from '@/shared/model/types/enums'
import { create } from 'zustand'

export type TBodyDialogMessage = {
	title: string
	message?: string
}

type TDialogWindow = {
	open: boolean
	type: typeDialog

	setOpen: (state: boolean, dataDialog?: TBodyDialogMessage, type?: typeDialog) => void
	// setResponse: (state: boolean) => void;
	dataDialog?: TBodyDialogMessage
	dispatchFn: any
	setDispatchFn: (state: any) => void
}

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
