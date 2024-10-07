import { TResponseUploadFiles } from '@/Types/Types'
import Image from 'next/image'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { MdDelete } from 'react-icons/md'
import { NOT_FOUND_PICTURE } from '../../../../../config/urls'
import { cn } from '../../../../../function/helpers/cn'
import { SERVER_DOTNET } from '../../../../../config/config'

export type TPreviewUploadFile = {
	preview: boolean
	width: number
	height: number
	alt?: string
}

export default function PreviewPictureFile({
	width,
	height,
	alt,
	deletedFile,
	...props
}: Omit<TPreviewUploadFile, 'preview'> & { deletedFile: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void } & TResponseUploadFiles &
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	const { FullPath } = props
	return (
		<div className={cn('flex justify-center items-center relative', props.className)}>
			<Image
				height={height}
				width={width}
				src={`${SERVER_DOTNET}/${FullPath}`}
				alt={alt || NOT_FOUND_PICTURE}
				className=' rounded-md '
			/>
			<button className=' text-xl absolute  top-3/4 left-3/4 ' onClick={deletedFile}>
				<MdDelete />
			</button>
		</div>
	)
}
