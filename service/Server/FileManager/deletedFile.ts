import { TResponseDeletedFile } from '@/Types/Types'
import { SERVER_DOTNET } from '../../../config/config'
import { TError } from '@/Types/subtypes/TError'
import { typicalError } from '@/Types/enums'

export const fetchDeletedFile = async (path: string): Promise<TResponseDeletedFile | TError> => {
	try {
		const response = await fetch(`${SERVER_DOTNET}/api/FileManager/deletedFile?path=${path}`, {
			method: 'POST',
			body: JSON.stringify(path),
			headers: { 'Content-Type': 'application/json' },
		})
		
		if (response.ok) {
			return response.json() as Promise<TResponseDeletedFile>
		} else {
			return {
				error: true,
				message: `error server error deleted file,full path file : ${path.toUpperCase()}`,
				typeError: typicalError.error_sever,
			}
		}
	} catch (error) {
		return {
			error: true,
			message: `error fetch deleted file,full path file : ${path.toLocaleUpperCase()},error :${error}`,
		}
	}
		
}

//!NOT TESTING
export const fetchDeletedManyFiles = async (path: string[]): Promise<TResponseDeletedFile[] | TError> => {
	try {
		const response = await fetch(`${SERVER_DOTNET}/api/FileManager/deletedManyFiles`, {
			method: 'POST',
			body: JSON.stringify(path),
			headers: { 'Content-Type': 'application/json' },
		})
		if (response.ok) {
			return response.json() as Promise<TResponseDeletedFile[]>
		} else {
			return {
				error: true,
				message: `error server error deleted file,full path file : ${path.join('-')}`,
				typeError: typicalError.error_sever,
			}
		}
	} catch (error) {
		return {
			error: true,
			message: `error fetch deleted file,full path file : ${path.join('-')}`,
			typeError: typicalError.error_sever,
		}
	}
}
