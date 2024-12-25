'use client'

import { typicalError } from '@/shared/model/types/enums'
import { redirect } from 'next/navigation'

import { isError } from '../../../../../../shared/lib/IsError'
import { useConfigApp } from '../../../../../../shared/model/store/storeConfigApp'
import { useLoader } from '../../../../../../shared/model/store/storeLoader'
import { fetchSaveConfigApp } from '@/entities/configApp/api/serviceFetchConfigApp'
import FormConfigApp from '@/entities/configApp/ui/FormConfigApp'
import FormTypicallyColorSchema from '@/entities/configApp/ui/FormTypicallyColorSchema'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'

export default function page({ params }: { params: { INN: string } }) {
	const dataConfigApp = useConfigApp((state) => state.dataConfigApp)
	const {idUser} = useInfoUser(state=>state.dataUser)
	const setLoader = useLoader((state) => state.setVisibleLoader)

	const submitConfigApp = async () => {
		setLoader(true)	
		
		const INN = params.INN
		const response = await fetchSaveConfigApp(dataConfigApp, INN, idUser)
		if (response.status != 200 || isError(response.response)) {
			redirect(`/ERROR/${typicalError.error_DB}`)
		} else {
			setLoader(false)
		}
	}
	return (
		<div className=' grid  grid-cols-5 gap-1 mt-2'>
			<div className=' col-span-3'>
				<FormConfigApp />
			</div>
			<div className=' col-span-2'>
				<FormTypicallyColorSchema />
			</div>
			<button className=' w-full  col-span-5 mt-2' onClick={submitConfigApp}>
				Сохранить
			</button>
		</div>
	)
}
