export enum typeDialog {
  error = "ERROR",
  default = "DEFAULT",
  dialog = "DIALOG",
}

export type TBodyDialogMessage = {
	title: string
	message?: string
}

export type TDialogWindow = {
	open: boolean
	type: typeDialog
	setOpen: (state: boolean, dataDialog?: TBodyDialogMessage, type?: typeDialog) => void
	// setResponse: (state: boolean) => void;
	dataDialog?: TBodyDialogMessage
	dispatchFn: any
	setDispatchFn: (state: any) => void
}
