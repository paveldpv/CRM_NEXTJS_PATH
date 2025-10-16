import { TEntities } from '@/shared/model/types/abstractsType'
import { Types } from 'mongoose'


export type TNewTask = Omit<TTask,'_id'|'service'|'safeDeleted'>

export type TTask = {
	
	idAssignEmployees: Types.ObjectId[]	
	idDetail?: Types.ObjectId
	service: TServiceTask
	salary?: TSalary[]
} & TEntities

export type TSalary = {
	idEmployee: Types.ObjectId
	payment: number
}

export type TServiceTask = {
	dateCreateTask: Date
	dateEndRedactTask?: Date
	dateEndTask?: Date
	dateExecution?: {
		startDate?: Date
		endDate?: Date
		dateDeadline?: Date
	}
}
