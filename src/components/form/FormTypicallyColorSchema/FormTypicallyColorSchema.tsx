'use client'
import Loader from '@/components/UI/Loaders/Loader'
import Fieldset from '@/containers/Fieldset'
import { useConfigApp } from '../../../../store/storeConfigApp'
import { useLoader } from '../../../../store/storeLoader'
import { dataTypicallyColor } from './dataTypicallyColor'
import SelectTypicallyColor from './SelectTypicallyColor'

export default function FormTypicallyColorSchema() {
	const visibleLoader = useLoader((state) => state.visible)
	const [currentConfigApp, setConfigApp] = useConfigApp((state) => [
		state.dataConfigApp,
		state.setDataConfigApp,
	])

	return (
		<Fieldset legend='Стандартные оформление'>
			{visibleLoader ? (
				<div className='h-80 flex  justify-center items-center mt-8 mb-10'>
					<Loader />
				</div>
			) : (
				<ul className=' grid  grid-cols-2  gap-4 justify-evenly '>
					{dataTypicallyColor.map((element, index) => (
						<SelectTypicallyColor
							setConfigApp={setConfigApp}
							currentConfigApp={currentConfigApp}
							index={index}
							key={index}
							configHeader={element.configHeader}
							configMain={element.configMain}
							configNavMenu={element.configNavMenu}
						/>
					))}
				</ul>
			)}
		</Fieldset>
	)
}
