import { TEntities, TValueFiled } from '../abstractsType'
import { NotData } from '../enums'
import { TResponseUploadFiles } from '../Types'

export type TRequisitesBank = {
	[key: string]: TValueFiled<string | number>
	checkingAccount: TValueFiled<number | string>
	nameBank: TValueFiled<string>
	korAccount: TValueFiled<string>
	BIK: TValueFiled<number | string>
}

export type TRequisites = {
	[key: string]:
		| TValueFiled<string | number | string[]>
		| TRequisitesBank
		| TResponseUploadFiles
		| 'NOT_FOUND'
		| boolean
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
