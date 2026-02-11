'use client'
import { cn } from '@/shared/lib/cn'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { Spin } from 'antd'
import React, { memo } from 'react'

interface MiniLoaderProps {
	visible?: boolean
	className?:React.CSSProperties
}

function CusSpin({ visible = true,className }: MiniLoaderProps) {
	if (!visible) return null
	const { configMain } = useConfigApp((state) => state.dataConfigApp)

	return (
		<Spin
		className={cn("flex justify-center items-center",className)}
			size='default'
			style={{
				color: configMain?.color.bgColor || '#F47C28',
			}}
		/>
	)
}

export default memo(CusSpin)
