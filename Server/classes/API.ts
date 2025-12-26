import Logger from './Logger'

export class API extends Logger {
	
	protected async changeStatus(response:Response):Promise<void>{
		if (response.status != 200) {			
			this.createError(`error  ,error data${response}`)
			throw new Error(`error  ,error data${response}`)
		}
		return
	}
	
	protected async getResponse<T>(response: Response): Promise<T> {
		this.changeStatus(response)		
		const result = (await response.json()) as T
		return result
	}
}
