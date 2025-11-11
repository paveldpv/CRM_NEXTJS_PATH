import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TError } from '@/shared/model/types/subtypes/TError'

import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'
import { SERVER_DOTNET } from '../../../../config/config'

export const fetchUploadFilePrevCal = async (formData: FormData): Promise<TResponseUploadFiles[] | undefined> => {
	try {
		const response = await fetch(`${SERVER_DOTNET}/api/FileManager/uploadRequest`, {
			method: 'POST',
			body: formData,
		})
		if (!response.ok) {
			return
		}

		if (response.ok) {
			return response.json() as Promise<TResponseUploadFiles[]>
		}
	} catch (error) {
		console.log(error)
		return
	}
}

export const fetchUploadFileOrganization = async (
	INN: string,
	formData: FormData
): Promise<TResponseUploadFiles[] | TError> => {
	try {
		const response = await fetch(`${SERVER_DOTNET}/api/FileManager/uploadDataFilesOrganization/${INN}`, {
			method: 'POST',
			body: formData,
		})
		if (response.ok) {
			return response.json() as Promise<TResponseUploadFiles[]>
		}

		return {
			error: true,
			message: `error upload file, response not OK`,
			typeError: typicalError.error_sever,
		}
	} catch (error) {
		return {
			error: true,
			message: `error fetch ,error :${error}`,
		}
	}
}
