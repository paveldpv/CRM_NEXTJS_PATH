import { TError } from '@/shared/model/types/subtypes/TError'

import { Types } from 'mongoose'
import { Service } from '../../classes/Service'
import ControllerPrevCalDB from './controller/PrevCalcDB.controller'
import { TDBRequestPrevCalc, TRequestPrevCalc } from './model/types/Types'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'

export class ServicePrevCalc extends Service {
	constructor(INN: string) {
		super(INN)
	}
	public async saveRequest(data: TRequestPrevCalc): Promise<void | TError> {
		try {
			const currentDate = new Date()
			data.dateRequest = currentDate
			await new ControllerPrevCalDB(this.INN).saveRequest(data)
		} catch (error) {
			return this.createError(`error save request prev calc ,data:${data}, error :${error}`)
		}
	}
	public async deleteRequest(idRequest: Types.ObjectId): Promise<void | TError> {
		try {
			await new ControllerPrevCalDB(this.INN).deletedRequest(idRequest)
		} catch (error) {
			this.createError(`error deleted request , INN :${this.INN},idRequest  :${idRequest},error : ${error}`)
		}
	}

	public async getRequestPrevCalc(
		option?: TOptionQuery<TRequestPrevCalc>
	): Promise<TError | TDBRequestPrevCalc[] | []> {
		try {
			if (option) {
				const data = await new ControllerPrevCalDB(this.INN).getRequestGivenRange(option)
				return this.normalizeDataFromMongoDB(data)
			} else {
				const data = await new ControllerPrevCalDB(this.INN).getAllRequest()
				return this.normalizeDataFromMongoDB(data)
			}
		} catch (error) {
			return this.createError(`error get request prev calc ,INN :${this.INN}, error ${error}`)
		}
	}

	public async getFavoriteRequest(
		option?: TOptionQuery<TRequestPrevCalc>
	): Promise<TError | TDBRequestPrevCalc[] | []> {
		try {
			if (option) {
				const data = await new ControllerPrevCalDB(this.INN).getFavoriteRequestGiveRange(option)
				return this.normalizeDataFromMongoDB(data)
			} else {
				const data = await new ControllerPrevCalDB(this.INN).getFavoriteRequest()
				return this.normalizeDataFromMongoDB(data)
			}
		} catch (error) {
			return this.createError(`error get favorite request ,inn :${this.INN},error ${error}`, error)
		}
	}

	public async setFavoriteRequest(idRequest: Types.ObjectId, isFavorite: boolean): Promise<void | TError> {
		try {
			if (isFavorite) {
				await new ControllerPrevCalDB(this.INN).setFavoriteRequest(idRequest)
			} else {
				await new ControllerPrevCalDB(this.INN).disableFavoriteRequest(idRequest)
			}
		} catch (error) {
			this.createError(
				`error set favorite request ,id request :${idRequest}, flag (isFavorite) :${isFavorite},error :${error}`,
				error
			)
		}
	}

	public async getDeletedRequest(): Promise<TDBRequestPrevCalc[] | TError> {
		try {
			const controllerPrevCalDB = new ControllerPrevCalDB(this.INN)
			const data = await controllerPrevCalDB.getAllRequestWithDeleted()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(`error get request with deleted , INN :${this.INN},error = ${error}`, error)
		}
	}
	
	public async restoreRequest(idRequest: Types.ObjectId){
		try {
			await new ControllerPrevCalDB(this.INN).restoreRequest(idRequest)
		} catch (error) {
			this.createError(`error deleted request , INN :${this.INN},idRequest  :${idRequest},error : ${error}`)
		}
	}


	public async getNewRequestPrevCalc(): Promise<TDBRequestPrevCalc[] | TError> {
		try {
			const controllerPrevCalDB = new ControllerPrevCalDB(this.INN)
			const data = await controllerPrevCalDB.getGetVerifiedRequest()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(`error get get new request prev calc , INN :${this.INN},error = ${error}`, error)
		}
	}

	public async setVerifiedRequest(_id: Types.ObjectId): Promise<TError | void> {
		try {
			const controllerPrevCalDB = new ControllerPrevCalDB(this.INN)
			await controllerPrevCalDB.setVerifiedRequest(_id)
			return
		} catch (error) {
			return this.createError(
				`error set verified request _id =${_id.toString()} , INN :${this.INN},error = ${error}`,
				error
			)
		}
	}
	public async  setVerifiedRequestMany(ids:Types.ObjectId[]){
		try {
			const controllerPrevCalDB = new ControllerPrevCalDB(this.INN)
			await controllerPrevCalDB.setVerifiedRequestMany(ids)
		} catch (error) {
			return this.createError(`error set verified request many ,INN:${this.INN},id :${ids}`,error)
		}
	}
	
}
