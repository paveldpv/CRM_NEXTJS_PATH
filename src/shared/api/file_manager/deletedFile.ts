import { typicalError } from '@/shared/model/types/enums'
import { TError } from '@/shared/model/types/subtypes/TError'

import { SERVER_DOTNET } from '../../../../config/config'
import { TResponseDeletedFile } from '@/shared/model/types/Types'

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
