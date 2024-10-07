import { TResponseUploadFiles } from '@/Types/Types'
import { FaDownload } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'
import { formatBytes } from '../../../../../function/helpers/formatBytes'
import { ChangeEvent, DetailedHTMLProps, HTMLAttributes, MouseEventHandler } from 'react'
import { cn } from '../../../../../function/helpers/cn'
import { SERVER_DOTNET } from '../../../../../config/config'

export type TDownloaderFile = {
	deletedFile: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	permissionDeletedFile: boolean
} & TResponseUploadFiles & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export default function DownloadFile({
	FullPath,
	NameFile,
	SizeFile,
	DateTimeUpdateFile,
	deletedFile,
	permissionDeletedFile,
	...props
}: TDownloaderFile) {
	
	
	return (
		<div className={cn('flex justify-between align-baseline p-2 border-2  border-dashed border-highlight_three rounded-md',props.className)}>
			<a  target="_blank" href={`${SERVER_DOTNET}/${FullPath}`} download={NameFile} className=' cursor-pointer pl-3'>
				<span className=' text-2xl text-highlight_three'>
					<FaDownload />
				</span>
			</a>
			
				<div>
					<span className= '  text-xs mr-1'>{NameFile}</span>
					<sub className='  text-[8px] underline'>{formatBytes(SizeFile, 2)}</sub>
				</div>
				{permissionDeletedFile && (
					<div className=' border-l-2 border-dashed border-highlight_three pl-4'>
						<button onClick={deletedFile} className=' text-xl'>
							<MdDelete />
						</button>
					</div>
				)}
			
		</div>
	)
}
