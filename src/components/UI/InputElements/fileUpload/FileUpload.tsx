import { typeDialog } from '@/Types/enums'
import { TResponseUploadFiles } from '@/Types/Types'
import { redirect, useParams } from 'next/navigation'
import { ChangeEvent, DetailedHTMLProps, HTMLAttributes, useState } from 'react'
import { combineFilesToFormData } from '../../../../../function/combineFilesToFormData'
import { isError } from '../../../../../function/IsError'
import { fetchUploadFileOrganization } from '../../../../../service/Server/fetchServer'
import { useDialogWindow } from '../../../../../store/storeDialogWindow'
import DownloadFile from './DownloadFile'
import InputFile from './InputFile'
import PreviewPictureFile, { TPreviewUploadFile } from './PreviewPictureFile'

type TFileUpload = {
	nameFiled: string
	set: (nameField: string, data: TResponseUploadFiles) => void
	tooltipTitle?: string
	src?: 'NOT_FOUND' | TResponseUploadFiles
	preview?: TPreviewUploadFile
	permissionDeletedFile?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const IMAGE_FORMAT = ['jpg', 'gif', 'png', 'jpeg']

export default function FileUpload({
	src = 'NOT_FOUND',
	nameFiled,
	permissionDeletedFile = false,
	tooltipTitle = 'файл',
	set,
	preview,
	...props
}: TFileUpload) {
	const { INN } = useParams()
	const setOpenDialogWindow = useDialogWindow((state) => state.setOpen)
	const [file, setFile] = useState(src)
	const [pending, setPending] = useState(false)

	const deletedFile = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		if (file === 'NOT_FOUND') return
		console.log(file.FullPath)
	}

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		setPending(true)
		if (!e.currentTarget.files) return
		const file = e.currentTarget.files[0]
		const combineFile = combineFilesToFormData([file])
		const uploadFile = await fetchUploadFileOrganization(INN.toString(), combineFile)
		if (isError(uploadFile)) {
			setOpenDialogWindow(true, { title: 'ошибка загрузки файла' }, typeDialog.error)
			setTimeout(() => {
				redirect(`/ERROR`)
			}, 1500)
		} else {
			setFile(uploadFile[0])
			setPending(false)
			set(nameFiled, uploadFile[0])
		}
	}

	if (file !== 'NOT_FOUND' && preview?.preview && IMAGE_FORMAT.some((format) => format === file.fileFormat)) {
		return (
			<PreviewPictureFile
				height={preview.height}
				className={props.className}
				deletedFile={deletedFile}
				width={preview.width}
				FullPath={file.FullPath}
				NameFile={file.NameFile}
				DateTimeUpdateFile={file.DateTimeUpdateFile}
				Errored={file.Errored}
				IDFile={file.IDFile}
				SizeFile={file.SizeFile}
			/>
		)
	}

	if (file !== 'NOT_FOUND') {
		return (
			<DownloadFile
				className={props.className}
				permissionDeletedFile={true}
				deletedFile={deletedFile}
				SizeFile={file?.SizeFile}
				FullPath={file?.FullPath!}
				NameFile={file?.NameFile!}
				DateTimeUpdateFile={file?.DateTimeUpdateFile!}
				Errored={file?.Errored!}
				IDFile={file?.IDFile!}
			/>
		)
	} else {
		return <InputFile tooltipTitle={tooltipTitle} uploadFile={uploadFile} pending={pending} />
	}
}
