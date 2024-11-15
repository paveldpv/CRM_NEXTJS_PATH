import FormProfile from '@/entities/userProfile/ui/FormProfile'
import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import DialogWindow from '@/shared/ui/DialogWindow'
import ProgressLoader from '@/shared/ui/loaders/ProgressLoader'
import React from 'react'



export default function Profile() {
	const [initialValues,setInfoUser]=useInfoUser(state=>[state.dataUser,state.setInfoUser])
	return (
		<div className=' mt-2'>
			<FormProfile initialValues={initialValues}  setInfoUser={setInfoUser}/>
			<ProgressLoader/>		
		</div>
	)
}