import { create } from 'zustand'
import { TCusSnackbar, TParamsOpenSnackbar } from './types'



export const useCusSnackbar = create<TCusSnackbar>((set)=>({
	open:false,
	children:null,
	autoHidden:false,
	setOpen:(params:TParamsOpenSnackbar)=>{
		if(typeof params ==='boolean'){
			set({open:params})
		}else{
			set({
				open:params.open,autoHidden:params.autoHidden
			})
		}
		
	},
	setChildren:(data)=>{
		set({children:data})
	}
}))
