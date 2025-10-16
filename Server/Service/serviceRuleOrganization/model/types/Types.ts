import { TResponseUploadFiles } from '@/shared/model/types/Types'
import { TCoordinateLocation } from '../../../serviceGeoLocation/model/types/type'
import { TEntities } from '@/shared/model/types/abstractsType'
import { Types } from 'mongoose'
import { TRequisites } from '@/shared/model/types/TRequisites'
import { TRequisitesDTO } from '../../../serviceRequisites/model/types/Type'


export type TActualAddress = {
	location: TCoordinateLocation
	actualAddress: string
}

export type TEmai = {
	password: string
	email: string
	dataUpdate: Date
}

export type TTelegramParams = {
	idTelegramBot: string
	hrefChat: string
	botOn: boolean
}
export type TNameOrganization = {
	abbreviated: string
	fullName: string
}

export type TDataOrganization = {
	INN:  string
	dateRegistration: Date
	nameOrganization: TNameOrganization
	requisites: Types.ObjectId;
	paramsEmailNewsletter: TEmai
	seal: TResponseUploadFiles | 'NOT_FOUND'
	telegram: TTelegramParams
	actualAddress: TActualAddress
} & TEntities

export type TNewRuleOrganization = Omit<TDataOrganization,'_id'|'safeDeleted'>
export type TDataOrganizationFullInfo = Omit<TDataOrganization,'requisites'> &{requisites:TRequisites}

export type TDataOrganizationDTO = Omit<TDataOrganization,'_id'|'requisites'> & {_id:string,requisites:string}
export type TDataOrganizationFullInfoDTO =  Omit<TDataOrganizationDTO ,'requisites'> & {requisites:TRequisitesDTO}
