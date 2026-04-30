import { redirect, useParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

import { combineFilesToFormData } from '../../../lib/combineFilesToFormData'
import { isError } from '../../../lib/IsError'
import { useDialogWindow } from '../../../ui/dialogWindow/model/storeDialogWindow'

import { FetchFileManager } from '@/shared/api/file_manager/FetchFilemanager'
import { typeDialog } from '@/shared/ui/dialogWindow/model/Types/Types'
import { IMAGE_FORMAT } from '../model/consts'
import { TFileUpload } from '../model/type'
import DownloadFile from './DownloadFile'
import InputFile from './InputFile'
import PreviewPictureFile from './PreviewPictureFile'

export default function FileUpload({
	src = 'NOT_FOUND',
	nameFiled,
	permissionDeletedFile = false,
	tooltipTitle = 'файл',
	set,
	preview,
	fallBackDeleted,
	fallBackUpload,
	...props
}: TFileUpload) {
	const { INN } = useParams() as { INN: string }
	const setOpenDialogWindow = useDialogWindow((state) => state.setOpen)
	const [file, setFile] = useState(src)
	const [pending, setPending] = useState(false)

	const deletedFile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setPending(true)
		e.preventDefault()
		if (file === 'NOT_FOUND') return
		const deletedFile = await FetchFileManager.deletedFile(file.FullPath)

		if (isError(deletedFile)) {
			setOpenDialogWindow(
				true,
				{
					title: 'ошибка удаления ',
					message: 'проблемы сервера работающего с файлами',
				},
				typeDialog.error,
			)
			
		} else {
			setFile('NOT_FOUND')
			set(nameFiled, 'NOT_FOUND')
			setPending(false)
			fallBackDeleted && fallBackDeleted()
		}
	}

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		setPending(true)
		if (!e.currentTarget.files) return
		const file = e.currentTarget.files[0]
		const combineFile = combineFilesToFormData([file])
		const uploadFile = await FetchFileManager.uploadFileOrganization(INN.toString(), combineFile)
		if (isError(uploadFile)) {
			setOpenDialogWindow(true, { title: 'ошибка загрузки файла' }, typeDialog.error)
			setTimeout(() => {
				redirect(`/ERROR`)
			}, 1500)
		} else {
			setFile(uploadFile[0])
			setPending(false)
			set(nameFiled, uploadFile[0])
			fallBackUpload && fallBackUpload(uploadFile[0])
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
