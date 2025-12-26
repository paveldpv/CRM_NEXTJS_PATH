import { TEntities } from '@/shared/model/types/subtypes/abstractsType'
import { Types } from 'mongoose'
import { TCounterparty, TCounterpartyDTO } from '../../../serviceCounterparty/models/types/Types'
import { TDBUserWithoutPas, TUserDTOWithoutPas } from '../../../serviceUser/model/types/Types'

export type TNewOrder = Omit<TOrder, '_id' | 'safeDeleted' | 'numberOrder' | 'complied'| 'details'>
export type TNewOrderDTO = Omit<TNewOrder, 'CounterParty' | 'acceptedOfCargoEmployeeId' | 'details'> & {
	CounterParty: string
	acceptedOfCargoEmployeeId: string,
}


export type TOrder = {
	CounterParty: Types.ObjectId
	complied: boolean
	numberOrder: number
	acceptedOfCargoEmployeeId: Types.ObjectId
	details: Types.ObjectId[] | []
	service: TServiceOrder
	payment?:TPaymentOrder
	optionsDescription?: string[]
	processCompleted?: number
} & TEntities

export type TOrderFullInfo = Omit<TOrder, 'CounterParty'> & {
	CounterParty: TCounterparty
	acceptedOfCargoEmployeeId: TDBUserWithoutPas
}

export type TOrderDTO = Omit<TOrder, '_id'|'CounterParty'|'acceptedOfCargoEmployeeId'|'details'> & { _id: string,CounterParty:string,acceptedOfCargoEmployeeId: string,details:string[] }


export type TOrderFullInfoDTO = Omit<
	TOrderFullInfo,
	'CounterParty' | '_id' | 'details' | 'acceptedOfCargoEmployeeId'
> & {
	CounterParty: TCounterpartyDTO
	details: string[]
	_id: string
	acceptedOfCargoEmployeeId: TUserDTOWithoutPas
}

//#region payment
export type TPaymentOrder = {
	type: type_payment
	price: number
	paymentStatus: boolean
	payment:number
}



export enum type_payment {
	cash = 'CASH',
	no_vat = 'NO_VAT',
	vat = 'VAT',
}
//#endregion 

//#region service type Order
export type TServiceOrder = {
	deadlines: {
		startDate: Date
		endDate?: Date
	}
	delivered?: TDelivered
}

export type TDelivered = {
	dateDelivered: Date
	car: {
		number?: string
		driver?: TDriver
	}
}

export type TDriver = {
	name?: string
	lastName?: string
	surName?: string
	phone?: string
}


//#endregion
