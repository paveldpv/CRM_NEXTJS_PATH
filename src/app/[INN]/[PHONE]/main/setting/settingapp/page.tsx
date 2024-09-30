'use client'
import FormTypicallyColorSchema from '@/components/form/FormTypicallyColorSchema/FormTypicallyColorSchema'
import FormConfigApp from '@/components/form/formConfigApp/FormConfigApp'
import { useConfigApp } from '../../../../../../../store/storeConfigApp'
import { useLoader } from '../../../../../../../store/storeLoader'
import { useInfoUser } from '../../../../../../../store/storeInfoUser'
import { fetchSaveConfigApp } from '../../../../../../../service/serviceFetchConfigApp'
import { isError } from '../../../../../../../function/IsError'
import { redirect } from 'next/navigation'
import { typicalError } from '@/Types/enums'

export default function page({ params }: { params: { INN: string } }) {
	const dataConfigApp = useConfigApp((state) => state.dataConfigApp)
	const setLoader =useLoader(state=>state.setVisibleLoader)
	

	const submitConfigApp = async () => {
		setLoader(true)
		const {idUser}=dataConfigApp
		const INN= params.INN
		const response = await fetchSaveConfigApp(dataConfigApp,INN,idUser!)
		if(response.status!=200 || isError(response.response)){
			redirect(`/ERROR/${typicalError.error_DB}`)
		}
		else{
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
