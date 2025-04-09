import { TEntities } from '@/shared/model/types/abstractsType'
import {ObjectId} from 'mongoose'

export type TNewTask = Omit<TTask,'_id'|'service'|'safeDeleted'>

export type TTask = {
	_id: ObjectId
	idAssignEmployees: ObjectId[]	
	idDetail?: ObjectId
	service: TServiceTask
	salary?: TSalary[]
} & TEntities

export type TSalary = {
	idEmployee: ObjectId
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
