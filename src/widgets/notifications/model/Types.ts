import { TInitialValuesFormPrevCalc } from '@/shared/model/types/TRequestPrevCalc'
import { TDBUser } from '../../../../Server/Service/serviceUser/model/types/Types'


export type TNotificationsList ={
	birthdayUser?:Pick<TDBUser,'name'|'surname'|'lastName'>[]|null
	newPrevCalc?:TInitialValuesFormPrevCalc[]| null
}