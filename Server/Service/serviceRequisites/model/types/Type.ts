import { TEntities, TValueFiled } from '@/shared/model/types/subtypes/abstractsType'
import { NotData } from '@/shared/model/types/subtypes/enums'
import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'

export type TRequisitesBank = {
	[key: string]: TValueFiled<string | number>
	checkingAccount: TValueFiled<number | string>
	nameBank: TValueFiled<string>
	korAccount: TValueFiled<string>
	BIK: TValueFiled<number | string>
}

export type TRequisites = {
	// [key: string]:
	// 	| TValueFiled<string | number | string[]>
	// 	| TRequisitesBank
	// 	| TResponseUploadFiles
	// 	| 'NOT_FOUND'
	// 	| boolean
	// 	| string
	INN: TValueFiled<number | string>
	KPP: TValueFiled<number>
	legalAddress: TValueFiled<string>
	mailAddress: TValueFiled<string>
	phone: TValueFiled<string>
	nameDirector: TValueFiled<string>
	email: TValueFiled<string>
	OGRN: TValueFiled<number | string>
	OKVD: TValueFiled<string[] | string>
	requisitesBank: TRequisitesBank
	srcRequisites: TResponseUploadFiles | NotData.notFile
} & TEntities

export type TNewRequisites = Omit<TRequisites, '_id'>
export type TRequisitesDTO = Omit<TRequisites, '_id'> & { _id: string }
