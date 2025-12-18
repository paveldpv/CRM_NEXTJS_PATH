import { TError } from '@/shared/model/types/subtypes/TError'

import { Service } from '../../classes/Service'
import ControllerGeoLocationDB from './controller/GeoLocationDB.controller'
import { TGeolLocationFullInfo, TGeoLocation } from './model/types/type'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'

export class ServiceGeoLocation extends Service {
	constructor(INN: string) {
		super(INN)
	}

	async  getDataLocation(option?: TOptionQuery<TGeoLocation>): Promise<TGeolLocationFullInfo[] | TError> {
		try {
			if (option) {
				const data = await new ControllerGeoLocationDB(this.INN).getDataLocationGivenRange(option)
				return this.normalizeDataFromMongoDB(data)
			}
			const data = await new ControllerGeoLocationDB(this.INN).getAllGeoLocation()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(`error get data location , error :${error}`, error)
		}
	}

	async setDataLocation(data: Omit<TGeoLocation, 'date'|'_id'>): Promise<void | TError> {
		try {
			await new ControllerGeoLocationDB(this.INN).saveGeoLocation({ ...data, date: new Date() })
		} catch (error) {
			return this.createError(`error set Data Location,  data :${data},error :${error}`, error)
		}
	}
}
