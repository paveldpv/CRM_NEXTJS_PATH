import { Tooltip } from '@mui/material'
import { FaFileUpload } from 'react-icons/fa'
import { IoIosWarning } from 'react-icons/io'


export type TLabelRequisites = {
	missingDataRequisites: boolean
	missingSrcRequisites: boolean
}

export default function LabelRequisites({
	missingDataRequisites,
	missingSrcRequisites,
}: TLabelRequisites) {
	
	
	if (!missingDataRequisites && !missingSrcRequisites) {
		return <span>Реквизиты</span>
	}

	return (
		<div>
			<ul className=' flex gap-2'>
				<li>
					{missingDataRequisites && (
						<Tooltip
							title={`отсутствуют  данные`}
							className='  text-xl text-red-400 w-9  cursor-help'
						>
							<span>
								<IoIosWarning />
							</span>
						</Tooltip>
					)}
				</li>
				<li>
					{missingSrcRequisites && (
						<Tooltip
							title={'не прикреплены реквизиты'}
							className='  text-xl text-red-400  cursor-help'
						>
							<span>
								<FaFileUpload />
							</span>
						</Tooltip>
					)}
				</li>
			</ul>
		</div>
	)
}
