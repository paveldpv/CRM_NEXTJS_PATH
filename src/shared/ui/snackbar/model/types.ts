import { ReactNode } from 'react'

export type TCusSnackbar = {
	open:boolean,
	autoHidden:boolean
	children:ReactNode|null
	setOpen:(params:TParamsOpenSnackbar)=>void
	setChildren:(data:ReactNode|null)=>void
}

export type TParamsOpenSnackbar ={
	open:boolean,
	autoHidden:boolean
} | false