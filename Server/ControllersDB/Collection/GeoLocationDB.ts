import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { connect } from 'mongoose'
import ContextOrganization from '../../classes/contextOrganization'
import modelGeoLocation from '../SCHEMAS/geoLocationSchema'

export default class ControllerDBGeoLocation extends ContextOrganization {
	constructor(INN: string) {
		super(INN)
	}
	public async saveGeoLocation(dataGeoLocation: TGeoLocation) {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const resultSaveGeoLocation = new modelGeoLocation(dataGeoLocation)
		await resultSaveGeoLocation.save()
	}
	public async getAllGeoLocation(): Promise<TGeoLocation[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelGeoLocation.find({})
	}
	public async getDataLocationGivenRange(range: number): Promise<TGeoLocation[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelGeoLocation
			.find({})
			.skip(range - 5)
			.limit(5)
	}
}
