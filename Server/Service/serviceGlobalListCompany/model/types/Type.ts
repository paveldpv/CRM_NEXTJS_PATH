import { TNameOrganization } from '@/shared/model/types/subtypes/TOrganization'
import { ObjectId } from 'mongoose'

export type TGlobalListCompany = {
	_id:ObjectId
	INN:string,
	name:TNameOrganization
	globalVisible?:boolean,
	description?:string[]
}
export type TGlobalListCompanyWithoutID = Omit<TGlobalListCompany,'_id'>

export const globalCompany = 'GLOBAL_COMPANY' as const;  



