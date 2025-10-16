
import { TNameOrganization } from '../../../serviceRuleOrganization/model/types/Types'

export type TGlobalListCompany = {
	_id: string
	INN: string
	name: TNameOrganization
	globalVisible?: boolean
	description?: string[]
}
export type TGlobalListCompanyWithoutID = Omit<TGlobalListCompany, '_id'>

export const listApi = {
	getListCompany: 'getGLobalListCompany', //+
	addNewCompany: 'addNewCompany', //+
	setVisibleCompany: 'setVisibleCompany"', //+
	updateDescriptionCompany: 'updateDescription', //+
	getAllGlobalListCompany: 'getAllGLobalListCompany', //+
	getCountDocGlobalListCompany: 'getCountDocGlobalListCompany', //+
	removeCompany: 'removeCompany', //+
}

export type TListAPIGlobalListCompany = (typeof listApi)[keyof typeof listApi]
