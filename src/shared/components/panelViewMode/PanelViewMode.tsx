'use client'
import CusButton from '@/shared/ui/button/ui/CusButton'
import { FaList, FaTh } from 'react-icons/fa'
import { TPanelViewMode } from './model/Types'
import { memo, useCallback } from 'react'

function PanelViewMode({ load, viewMode, setViewMode }: TPanelViewMode) {
	const setViewModeList = useCallback(() => {
		setViewMode('list')
	},[])
	const setViewModeCard = useCallback(() => {
		setViewMode('cards')
	},[])
	return (
		<div className='flex'>
			<CusButton
				onClick={setViewModeList}
				disabled={load}
				className={`${viewMode == 'list' && 'border-4'} duration-75 rounded-r-sm p-2`}
			>
				<FaList />
			</CusButton>
			<CusButton
				onClick={setViewModeCard}
				disabled={load}
				className={`${viewMode == 'cards' && 'border-4'} duration-75 rounded-l-sm p-2`}
			>
				<FaTh />
			</CusButton>
		</div>
	)
}
export default memo(PanelViewMode)