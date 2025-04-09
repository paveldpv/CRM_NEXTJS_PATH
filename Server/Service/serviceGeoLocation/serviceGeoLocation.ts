import { TError } from '@/shared/model/types/subtypes/TError'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import moment from 'moment'
import { Service } from '../../classes/Service'
import ControllerGeoLocationDB from './controller/GeoLocationDB.controller'


export class ServiceGeoLocation extends Service {
	constructor(INN: string) {
		super(INN)
	}

	
	async getDataLocation(range?: number): Promise<TGeoLocation[] | TError> {
		try {
			if (range) {
				const data = await new ControllerGeoLocationDB(this.INN).getDataLocationGivenRange(range)
				return this.normalizeDataFromMongoDB(data)
			}
			const data = await new ControllerGeoLocationDB(this.INN).getAllGeoLocation()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			
		return this.createError(`error get data location , error :${error}`,error)
		}
	}

	async setDataLocation(data: TGeoLocation | Omit<TGeoLocation, 'date'>): Promise<void | TError> {
		try {
			if ('date' in data) {
				await new ControllerGeoLocationDB(this.INN).saveGeoLocation(data)
			} else {
				await new ControllerGeoLocationDB(this.INN).saveGeoLocation({ ...data, date: moment().toDate() })
			}
		} catch (error) {
			
			return this.createError(`error set Data Location,  data :${data},error :${error}`,error)
		}
	}
}
