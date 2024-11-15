import { TWithoutPassUser } from '@/shared/model/types/Types'

export type TFormProfile = {
	initialValues:TWithoutPassUser,
	setInfoUser?:(state:TWithoutPassUser)=>void,
	
}