'use client'

import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'

import { useMemo, useState } from 'react'
import { useConfigApp } from '../../../shared/model/store/storeConfigApp'

import InputSettingColorLayout from './InputSettingColorLayout'
import { useLoader } from '@/shared/ui/loaders/namedLoader/model/storeLoader'
import Loader from '@/shared/ui/loaders/namedLoader/ui/Loader'
import { TConfigLayout } from '../../../../Server/Service/serviceConfigApp/model/types/Type'

export default function FormConfigApp() {
	const visibleLoader = useLoader((state) => state.visible)
	const dataConfigApp = useConfigApp((state) => state.dataConfigApp)

	const arrayConfigApp = useMemo(
		() => [dataConfigApp?.configHeader, dataConfigApp?.configMain, dataConfigApp?.configNavMenu],
		[dataConfigApp]
	) as TConfigLayout[]
	const [expandPanel, setExpandPanel] = useState<string | boolean>(false)

	return (
		<Fieldset legend='Настройки приложения'>
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
		</Fieldset>
	)
}
