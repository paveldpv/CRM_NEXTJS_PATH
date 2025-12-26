import mongoose, { Connection } from 'mongoose'
import ContextOrganization from './contextOrganization'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'

export type TProjectionType<T> = {
	[K in keyof T]?: 0 | 1
}
type TPoolConnectio = {
	[key: string]: Connection
}

const poolConnections: TPoolConnectio = {}

export default class ControllerDB extends ContextOrganization {
	protected dbConnection: Connection | null = null

	protected async connectDB() {
		const dbName = this.INN
		const urlDB = `${process.env.DB_URL}${dbName}`
		if (poolConnections[dbName]) {
			this.dbConnection = poolConnections[dbName]
			return
		}

		try {
			const _connection = await mongoose.createConnection(urlDB).asPromise()
			poolConnections[dbName] = _connection
			this.dbConnection = _connection
			this.log(`connected mongo from ${this.INN}`)
		} catch (error) {
			this.createError(`error create connection mongo from ${this.INN}`)
			throw error
		}
	}

	protected applyQueryOptions<T>(query: mongoose.Query<any, T>, options?: TOptionQuery<T>): mongoose.Query<any, T> {
		let modifiedQuery = query

		if (options?.pagination) {
			const { offset, limit } = options.pagination
			modifiedQuery = modifiedQuery.skip(offset).limit(limit)
		}

		if (options?.sort) {
			modifiedQuery = modifiedQuery.sort({
				[options.sort]: 1 as mongoose.SortOrder,
			})
		}

		return modifiedQuery
	}
}
