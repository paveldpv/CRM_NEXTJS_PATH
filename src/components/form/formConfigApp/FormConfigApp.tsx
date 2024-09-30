'use client'
import InputSettingColorLayout from '@/components/additional/InputSettingColorLayout'
import Loader from '@/components/UI/Loaders/Loader'
import { TConfigLayout } from '@/Types/subtypes/TAppearanceConfigApp'
import { useMemo, useState } from 'react'
import { useConfigApp } from '../../../../store/storeConfigApp'
import { useLoader } from '../../../../store/storeLoader'

export default function FormConfigApp() {
	const visibleLoader = useLoader((state) => state.visible)
	const dataConfigApp = useConfigApp((state) => state.dataConfigApp)

	const arrayConfigApp = useMemo(
		() => [
			dataConfigApp?.configHeader,
			dataConfigApp?.configMain,
			dataConfigApp?.configNavMenu,
		],
		[dataConfigApp]
	) as TConfigLayout[]
	const [expandPanel, setExpandPanel] = useState<string | boolean>(false)

	return (
		<fieldset className='border-2  border-solid border-menu_color p-2 text-xs  rounded-md  '>
			<legend className='p-2  rounded-md font-bold border-2 border-menu_color   text-menu_color  rounded-xs '>
				Настройки приложения
			</legend>
			{visibleLoader ? (
				<div className='h-80 flex  justify-center items-center mt-8 mb-10'>
					<Loader />
				</div>
			) : (
				<ul className=' flex flex-col gap-3 '>
					{arrayConfigApp.map((config, index) => (
						<InputSettingColorLayout
							indexPanel={index}
							expand={expandPanel}
							setExpand={setExpandPanel}
							key={index}
							keyConfig={config?.keyConfig!}
							color={config?.color}
							font={config?.font}
							textSize={config?.textSize}
							name={config?.name}
						/>
					))}
				</ul>
			)}
		</fieldset>
	)
}
