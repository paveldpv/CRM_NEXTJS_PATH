import { TError } from '@/shared/model/types/subtypes/TError'

export default class Logger {
	private logError(error: TError) {
		console.warn('===== E R R O R ====')
		console.error(error.message)
		console.warn('===== E R R O R ====')
	}
	protected log(message: string) {
		console.log(message)
	}
	private logTableError(error:Error){
		const er = {
			cause:error.cause,
			stack:error.stack,
			name:error.stack,
			message:error.message
		}
		console.table(er)
	}

	protected createError(message:string,error?:unknown):TError{
		const er:TError ={
			error:true,message
		} 
		this.logError(er)
		if(error instanceof Error){
			this.logTableError(error)
		}
		return er
	}

	
}
