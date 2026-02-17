import CusButton from '@/shared/ui/button/ui/CusButton'
import { Tooltip } from 'antd'
import { FaUser } from 'react-icons/fa'
import { TTooltipAcceptOfCargoEmployee } from '../../model/Types'
import Link from 'next/link'

export default function TooltipAcceptOfCargoEmployee(props: TTooltipAcceptOfCargoEmployee) {
	return (
		<Tooltip title={<TitleTooltip {...props} />}>
			<Link href={`/profile/${props._id}`}>
				<CusButton>
					<FaUser />
				</CusButton>
			</Link>
		</Tooltip>
	)
}

function TitleTooltip(props: TTooltipAcceptOfCargoEmployee) {
	return (
		<ul className=' text-sm'>
			<li>моб:</li>
			{props.nameJobTitle && <li className=' underline'>{props.nameJobTitle}</li>}
			{props.name && <li>{props.name}</li>}
			{props.surname && <li>{props.surname}</li>}
			{props.lastNam && <li>{props.lastNam}</li>}
		</ul>
	)
}
