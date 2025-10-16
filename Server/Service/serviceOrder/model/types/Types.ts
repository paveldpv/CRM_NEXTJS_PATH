import { TEntities } from '@/shared/model/types/abstractsType'
import { Types } from 'mongoose'
import { TCounterparty, TCounterpartyDTO } from '../../../serviceCounterparty/models/types/Types'

export type TNewOrder = Omit<TOrder, '_id' | 'safeDeleted' | 'numberOrder' | 'complied'>

export type TOrder = {
	CounterParty: Types.ObjectId
	complied: boolean
	numberOrder: number
	acceptedOfCargoEmployeeId: string | Types.ObjectId
	details: Types.ObjectId[] | []
	service: TServiceOrder
	optionsDescription?: string[]
} & TEntities

export type TOrderFullInfo = Omit<TOrder, 'CounterParty'> & { CounterParty: TCounterparty }

export type TOrderDTO = Omit<TOrder, '_id'> & { _id: string }
export type TOrderFullInfoDTO = Omit<TOrderFullInfo, 'CounterParty' | '_id'> & {
	CounterParty: TCounterpartyDTO
	_id: string
}

//#region service type Order

export type TServiceOrder = {
	acceptedOfCargoEmployeeId: string | Types.ObjectId
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

export type TPaymentOrder = {
	type: type_payment
	price: number
	paymentStatus: TPaymentStatus
}

export type TPaymentStatus =
	| {
			prepayment: number
	  }
	| boolean

export enum type_payment {
	cash = 'CASH',
	no_vat = 'NO_VAT',
	vat = 'VAT',
}
//#endregion
