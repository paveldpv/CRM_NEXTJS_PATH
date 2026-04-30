import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TResponseUploadFiles, TResponseDeletedFile } from '@/shared/model/types/subtypes/Types'
import { SERVER_DOTNET } from '../../../../config/config'

export class FetchFileManager {
	// ✅ Upload file (PrevCal)
	static async uploadFilePrevCal(formData: FormData): Promise<TResponseUploadFiles[] | TError> {
		try {
			const response = await fetch(`${SERVER_DOTNET}/api/FileManager/uploadRequest`, {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				return {
					error: true,
					message: `uploadFilePrevCal: server error ${response.status}`,
					typeError: typicalError.error_sever,
				}
			}

			const data = await response.json() as TResponseUploadFiles[]
			return data
		} catch (error) {
			return {
				error: true,
				message: `uploadFilePrevCal: fetch error - ${String(error)}`,
			}
		}
	}

	// ✅ Upload files for organization
	static async uploadFileOrganization(
		INN: string,
		formData: FormData
	): Promise<TResponseUploadFiles[] | TError> {
		try {
			const response = await fetch(`${SERVER_DOTNET}/api/FileManager/uploadDataFilesOrganization/${INN}`, {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				return {
					error: true,
					message: `uploadFileOrganization: server error ${response.status}`,
					typeError: typicalError.error_sever,
				}
			}

			const data = await response.json() as TResponseUploadFiles[]
			return data
		} catch (error) {
			return {
				error: true,
				message: `uploadFileOrganization: fetch error - ${String(error)}`,
			}
		}
	}

	// ✅ Delete single file
	static async deletedFile(path: string): Promise<TResponseDeletedFile | TError> {
		try {
			const response = await fetch(`${SERVER_DOTNET}/api/FileManager/deletedFile?path=${encodeURIComponent(path)}`, {
				method: 'POST',
				body: JSON.stringify(path),
				headers: { 'Content-Type': 'application/json' },
			})

			if (!response.ok) {
				return {
					error: true,
					message: `deletedFile: server error ${response.status}, path: ${path}`,
					typeError: typicalError.error_sever,
				}
			}

			const data = await response.json() as TResponseDeletedFile
			return data
		} catch (error) {
			return {
				error: true,
				message: `deletedFile: fetch error for path ${path}, error: ${String(error)}`,
			}
		}
	}

	// ✅ Delete many files
	static async deletedManyFiles(paths: string[]): Promise<TResponseDeletedFile[] | TError> {
		try {
			const response = await fetch(`${SERVER_DOTNET}/api/FileManager/deletedManyFiles`, {
				method: 'POST',
				body: JSON.stringify(paths),
				headers: { 'Content-Type': 'application/json' },
			})

			if (!response.ok) {
				return {
					error: true,
					message: `deletedManyFiles: server error ${response.status}, paths: ${paths.join(', ')}`,
					typeError: typicalError.error_sever,
				}
			}

			const data = await response.json() as TResponseDeletedFile[]
			return data
		} catch (error) {
			return {
				error: true,
				message: `deletedManyFiles: fetch error, paths: ${paths.join(', ')}, error: ${String(error)}`,
			}
		}
	}
}