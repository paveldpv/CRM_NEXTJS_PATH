import CusButton from '@/shared/ui/button/ui/CusButton'
import { FaList, FaTh } from 'react-icons/fa'
import { TPanelViewMode } from './model/Types'

export default function PanelViewMode({ load, viewMode, setViewMode }: TPanelViewMode) {
	const setViewModeList = () => {
		setViewMode('list')
	}
	const setViewModeCard = () => {
		setViewMode('cards')
	}
	return (
		<div>
			<CusButton
				onClick={setViewModeList}
				disabled={load}
				className={`${viewMode == 'list' && 'border-4'} rounded-r-sm p-2`}
			>
				<FaList />
			</CusButton>
			<CusButton
				onClick={setViewModeCard}
				disabled={load}
				className={`${viewMode == 'cards' && 'border-4'} rounded-l-sm p-2`}
			>
				<FaTh />
			</CusButton>
		</div>
	)
}
