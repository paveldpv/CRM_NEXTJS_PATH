'use client'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { Spin } from 'antd'
import { memo } from 'react'

interface MiniLoaderProps {
	visible?: boolean
	
}

function MiniLoader({ visible = true }: MiniLoaderProps) {
	if (!visible) return null
	const { configMain } = useConfigApp((state) => state.dataConfigApp)

	return (
		<Spin
			size='default'
			style={{
				color: configMain?.color.bgColor || '#F47C28',
			}}
		/>
	)
}

export default memo(MiniLoader)
