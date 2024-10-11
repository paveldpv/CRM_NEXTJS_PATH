import { TError } from '@/Types/subtypes/TError'
import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { Service } from '../classes/Service'
import ControllerGeoLocationDB from '../ControllersDB/Collection/GeoLocationDB'
import moment from 'moment'

export class ServiceGeoLocation extends Service {
	constructor(INN: string) {
		super(INN)
	}

	async getDataLocation(): Promise<TGeoLocation[] | TError>
	async getDataLocation(range: number): Promise<TGeoLocation[] | TError>

	async getDataLocation(range?: number): Promise<TGeoLocation[] | TError> {
		try {
			if (range) {
				const data = await new ControllerGeoLocationDB(
					this.INN
				).getDataLocationGivenRange(range)
				return this.normalizeDataFromMongoDB(data)
			}
			const data = await new ControllerGeoLocationDB(
				this.INN
			).getAllGeoLocation()
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return {
				error: true,
				message: `error get data location , error :${error}`,
			}
		}
	}

	async setDataLocation(data: TGeoLocation | Omit<TGeoLocation,'date'>): Promise<void | TError> {
		try {
			if('date' in data){
				await new ControllerGeoLocationDB(this.INN).saveGeoLocation(data)
			}
			else{
				await new ControllerGeoLocationDB(this.INN).saveGeoLocation({...data,date:moment().toDate()})
			}
		} catch (error) {
			const err: TError = {
				error: true,
				message: `error set Data Location,  data :${data},error :${error}`,
			}
			this.logError(err)
			return err
		}
	}
}
