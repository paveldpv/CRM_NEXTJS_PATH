import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { connect } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import modelGeoLocation from '../model/schema/geoLocationSchema'

export default class ControllerGeoLocationDB extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}
	public async saveGeoLocation(dataGeoLocation: TGeoLocation) {
		await this.contentDB()
		const resultSaveGeoLocation = new modelGeoLocation(dataGeoLocation)
		await resultSaveGeoLocation.save()
	}
	public async getAllGeoLocation(): Promise<TGeoLocation[] | []> {
		await this.contentDB()
		return await modelGeoLocation.find({})
	}
	public async getDataLocationGivenRange(range: number): Promise<TGeoLocation[] | []> {
		await this.contentDB()
		return await modelGeoLocation
			.find({})
			.skip(range - 5)
			.limit(5)
	}
}
