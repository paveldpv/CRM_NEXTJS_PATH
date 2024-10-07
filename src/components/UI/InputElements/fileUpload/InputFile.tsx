import  { ChangeEvent, DetailedHTMLProps, HTMLAttributes,useId } from 'react'
import { cn } from '../../../../../function/helpers/cn'
import HorizonLoader from '../../Loaders/PropsRuleLoaders/HorizonLoader'
import { Tooltip } from '@mui/material'
import { FaCloudDownloadAlt } from 'react-icons/fa'


type TInputFile = {
	pending:boolean
	uploadFile:(e:ChangeEvent<HTMLInputElement>)=>void
	tooltipTitle?: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export default function InputFile({pending,uploadFile,tooltipTitle="Файл",...props}: TInputFile) {
	const idLabel = useId()
	return (
		<div
				className={cn(
					' h-full text-5xl w-full border-menu_color border-2 border-dashed rounded-md flex items-center justify-center p-4  hover:text-color_header',
					props.className
				)}
			>
				{pending ? (
					<HorizonLoader visible={pending} />
				) : (
					<div>
						<Tooltip title={tooltipTitle}>
							<label htmlFor={idLabel} className=' hover:scale-125 cursor-pointer duration-500 delay-300 '>
								<FaCloudDownloadAlt />
							</label>
						</Tooltip>
						<input type='file' id={idLabel} hidden onChange={uploadFile} />
					</div>
				)}
			</div>
	)
}