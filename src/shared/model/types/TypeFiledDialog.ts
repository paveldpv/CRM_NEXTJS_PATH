import { TBodyDialogMessage } from '../store/storeDialogWindow'

export type TFieldDialog = {
	open: boolean
	setOpen: (args: TSetOpenFiledDialogArgs) => void
	dataDialog?: TBodyDialogMessage
	dispatchFn?: (value?: string) => void
	onCloseDispatchFn?: (value?: string) => void
}

type TSetOpenFiledDialogArgs = false | { state: true; dispatchFn?: () => void,onCloseDispatchFn?:()=>void; dataDialog?: TBodyDialogMessage }
