'use client'
import { memo } from 'react'
import { useMiniLoader } from '../../model/store/storeMiniLoader'
import style from './styleLoader.module.css'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'

type TMiniLoader = {
	className?: string
}

function MiniLoader({ className }: TMiniLoader) {
	const visibleMiniLoader = useMiniLoader((state) => state.visible)
	const dataConfigApp = useConfigApp(state=>state.dataConfigApp)
	const {configHeader}=dataConfigApp
	return (
		<span
			style={visibleMiniLoader ? { display: 'block',color:configHeader?.color.borderColor } : { display: 'none' }}
			className={`${className} ${style.Mini_Loader} `}
		></span>
	)
}
export default memo(MiniLoader)
