import CusButton from '@/shared/ui/button/ui/CusButton'
import { useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

type Props = {}

export default function PaginationPanel({}: Props) {
	useEffect(()=>{},[])
	return (
		<nav>
			<CusButton>
				<FaAngleLeft />
			</CusButton>
			<p>{}</p>
			<CusButton>
				<FaAngleRight />
			</CusButton>
		</nav>
	)
}
