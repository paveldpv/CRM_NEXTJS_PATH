'use client'
import { TConfigAPP } from '@/Types/subtypes/TAppearanceConfigApp'
import {  useMemo, memo } from 'react'
import { cn } from '../../../../function/helpers/cn'

export type TSelectTypicallyColor = Omit<TConfigAPP, 'idUser'> & {
	index: number
	currentConfigApp: Partial<TConfigAPP>
	setConfigApp: (config: Partial<TConfigAPP>) => void
}

 function SelectTypicallyColor({
	configHeader,
	configMain,
	configNavMenu,
	index,
	currentConfigApp,
	setConfigApp,
}: TSelectTypicallyColor) {


	const checkedColorSchema = useMemo(() => {
		if(JSON.stringify(currentConfigApp) ===
		JSON.stringify({ configHeader, configMain, configNavMenu })){
			return true
		}else{
			false
		}
	}, [currentConfigApp])

	
	const selectTypicalSchema = () => {
		console.log(configMain);
		console.log(configNavMenu);
		
		setConfigApp({ configHeader, configMain, configNavMenu })
	}

	return (
		<li className=' flex flex-col justify-center items-center rounded-md '>
			<label
				onClick={selectTypicalSchema}
				htmlFor={`labelFrom-[${index}]`}
				className={cn(
					`w-full  border-2 border-solid border-menu_color rounded-md  border-opacity-10 cursor-pointer p-1  hover:border-opacity-75 hover:scale-105  duration-700 delay-150 shadow-2xl `,
					checkedColorSchema && 'border-opacity-95 border-highlight_three scale-105  shadow-2xl'
				)}
			>
				<div className='w-full h-44 flex flex-col  '>
					{/* HEADER */}
					<section
						style={{
							background: `${configHeader.color.bgColor}`,
							borderColor: `${configHeader.color.borderColor}`,
						}}
						className='  bg-red-400 h-1/5 w-full border-2 rounded-t-md'
					></section>
					<div className='flex-shrink-1 flex-grow-1 basis-10/12 flex '>
						{/* NAVMENU */}
						<section
							style={{
								background: `${configNavMenu.color.bgColor}`,
								borderColor: `${configNavMenu.color.borderColor}`,
							}}
							className=' bg-blue-500 w-1/5 h-full border-2 rounded-bl-md'
						></section>
						{/* MAIN */}
						<section
							style={{
								background: `${configMain.color.bgColor}`,
								borderColor: `${configMain.color.borderColor}`,
							}}
							className=' bg-gray-500 w-full h-full border-2 rounded-br-md'
						></section>
					</div>
				</div>
			</label>
		</li>
	)
}


export default memo(SelectTypicallyColor)