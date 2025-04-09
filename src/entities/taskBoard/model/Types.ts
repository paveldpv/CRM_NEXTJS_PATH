import { TWithoutPassUser } from '@/shared/model/types/Types'
import { Dispatch, SetStateAction } from 'react'
import { TCounterparty } from '../../../../Server/Service/serviceCounterparty/models/types/Types'
import { TDetail } from '../../../../Server/Service/serviceDetails/model/types/Types'
import { TOrder } from '../../../../Server/Service/serviceOrder/model/types/Types'
import { TSalary } from '../../../../Server/Service/serviceTasks/model/types/Types'

export type TTasksBoard = {
	listProcessTask: TTask[]
	listOrder: TOrders[]
} & { readonly: boolean }

export type TOrders = {
	counterParty: Omit<TCounterparty, 'daData'>
	data: Omit<TOrder, 'idCounterParty' | 'service' | 'detail'>
}

export type TTask = {
	id: string
	idOrder: string
	detail: TDetail
	assignEmployees: TWithoutPassUser[]
	numberOrder: number
	salary?: TSalary
}

export type TListOrder = {
	dataOrder: TOrders[]
	setDataOrder: Dispatch<SetStateAction<TOrders[]>>
	dataTask: TTask[]
	setDataTask: Dispatch<SetStateAction<TTask[]>>
}

export type TListTasks = {
	dataTask: TTask[]
	setDataTask: Dispatch<SetStateAction<TTask[]>>
	dataOrder: TOrders[]
	setDataOrder: Dispatch<SetStateAction<TOrders[]>>
}

export type TFormAddNewOrder = {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
export type TCardDetails = {
	data: TDetail
	employees: TWithoutPassUser[]
}
