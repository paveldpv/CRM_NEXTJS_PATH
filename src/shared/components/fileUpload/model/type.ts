import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'
import { ChangeEvent, DetailedHTMLProps, HTMLAttributes } from 'react'

export type TFileUpload = {
	nameFiled: string
	set: (nameField: string, data: 'NOT_FOUND' | TResponseUploadFiles) => void
	tooltipTitle?: string
	src?: 'NOT_FOUND' | TResponseUploadFiles
	preview?: TPreviewUploadFile
	permissionDeletedFile?: boolean
	fallBackDeleted ?:()=>void
	fallBackUpload?:(data:TResponseUploadFiles)=>void
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type TInputFile = {
	pending: boolean
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => void
	tooltipTitle?: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export type TPreviewUploadFile = {
	deletedFile: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	preview: boolean
	width: number
	height: number
	alt?: string
	
}
