

import { TError } from '@/shared/model/types/subtypes/TError'
import { TRequestPrevCalc } from '@/shared/model/types/subtypes/TRequestPrevCalc'
import moment from 'moment'
import uniqid from 'uniqid'
import { Service } from '../../classes/Service'
import ControllerPrevCalDB from './controller/PrevCalcDB.controller'


export class ServicePrevCalc extends Service {
	constructor(INN: string) {
		super(INN)
	}
	public async saveRequest(data: TRequestPrevCalc): Promise<void | TError> {
		try {
			const _moment = moment()
			const currentDate = _moment.toDate()
			data.dateRequest = currentDate
			data.idRequest = uniqid()
			await new ControllerPrevCalDB(this.INN).saveRequest(data)
		} catch (error) {
			return this.createError(`error save request prev calc ,data:${data}, error :${error}`)
			
		
		}
	}
	public async deleteRequest(idRequest: string): Promise<void | TError> {
		try {
			await new ControllerPrevCalDB(this.INN).deletedRequest(idRequest)
		} catch (error) {
			this.createError(`error deleted request , INN :${this.INN},idRequest  :${idRequest},error : ${error}`)
			
		}
	}

	public async getRequestPrevCalc(range?: number): Promise<TError | TRequestPrevCalc[] | []> {
		try {
			if (range) {
				const data = await new ControllerPrevCalDB(this.INN).getRequestGivenRange(range)
				return this.normalizeDataFromMongoDB(data)
			} else {
				const data = await new ControllerPrevCalDB(this.INN).getAllRequest()
				return this.normalizeDataFromMongoDB(data)
			}
		} catch (error) {
		return 	this.createError(`error get request prev calc ,INN :${this.INN}, error ${error}`)
			
		}
	}

	public async getFavoriteRequest(range?: number): Promise<TError | TRequestPrevCalc[] | []> {
		try {
			if (range) {
				const data = await new ControllerPrevCalDB(this.INN).getFavoriteRequestGiveRange(range)
				return this.normalizeDataFromMongoDB(data)
			} else {
				const data = await new ControllerPrevCalDB(this.INN).getFavoriteRequest()
				return this.normalizeDataFromMongoDB(data)
			}
		} catch (error) {
			return this.createError(`error get favorite request ,inn :${this.INN},error ${error}`,error)
			
		}
	}

	public async setFavoriteRequest(idRequest: string, isFavorite: boolean): Promise<void | TError> {
		try {
			if (isFavorite) {
				await new ControllerPrevCalDB(this.INN).setFavoriteRequest(idRequest)
			} else {
				await new ControllerPrevCalDB(this.INN).disableFavoriteRequest(idRequest)
			}
		} catch (error) {
			
			this.createError(`error set favorite request ,id request :${idRequest}, flag (isFavorite) :${isFavorite},error :${error}`,error)
			
		}
	}
}
