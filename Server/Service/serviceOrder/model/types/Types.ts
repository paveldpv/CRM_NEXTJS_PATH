import { TEntities } from '@/shared/model/types/abstractsType'
import { ObjectId } from 'mongoose'

export type TNewOrder = Omit<TOrder, '_id' | 'safeDeleted'|'numberOrder'|'complied'>

export type TOrder = {
	_id: ObjectId
	idCounterParty: ObjectId
	complied:boolean,
	numberOrder: number
	acceptedOfCargoEmployeeId: string|ObjectId
	IDDetails: ObjectId[]|[]
	service: TServiceOrder
	optionsDescription?: string[]
} & TEntities

export type TServiceOrder = {
	acceptedOfCargoEmployeeId: string|ObjectId
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

export type TPaymentStatus = {
			prepayment: number
	  }
	| boolean

export enum type_payment {
	cash = 'CASH',
	no_vat = 'NO_VAT',
	vat = 'VAT',
}
