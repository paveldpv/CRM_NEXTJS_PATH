'use client'
import { memo } from 'react'
import { useMiniLoader } from '../../model/store/storeMiniLoader'
import style from './styleLoader.module.css'

type TMiniLoader = {
	className?: string
}

function MiniLoader({ className }: TMiniLoader) {
	const visibleMiniLoader = useMiniLoader((state) => state.visible)

	return (
		<span
			style={visibleMiniLoader ? { display: 'block' } : { display: 'none' }}
			className={`${className} ${style.Mini_Loader} `}
		></span>
	)
}
export default memo(MiniLoader)
