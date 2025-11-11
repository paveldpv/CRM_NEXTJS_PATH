import { Model } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { geoLocationSchema } from '../model/schema/geoLocationSchema'
import { TGeolLocationFullInfo, TGeoLocation } from '../model/types/type'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'

export default class ControllerGeoLocationDB extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private geoLocationModel: Model<TGeoLocation> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init geo location model from INN ${this.INN}`)

		this.geoLocationModel = this.dbConnection.model<TGeoLocation>('geoLocation', geoLocationSchema)
	}

	private async changeReadinessModel() {
		if (!this.geoLocationModel) await this.initModel()
	}

	public async saveGeoLocation(dataGeoLocation: TGeoLocation) {
		await this.changeReadinessModel()
		const resultSaveGeoLocation = new this.geoLocationModel!(dataGeoLocation)
		await resultSaveGeoLocation.save()
	}

	public async getAllGeoLocation(): Promise<TGeolLocationFullInfo[] | []> {
		await this.changeReadinessModel()
		return await this.geoLocationModel!.find({}).populate({ path: 'user', select: '-password' })
	}

	public async getDataLocationGivenRange(option?: TOptionQuery<TGeoLocation>): Promise<TGeolLocationFullInfo[] | []> {
		await this.changeReadinessModel()
		const dataGeoLocation = this.geoLocationModel!.find({}).populate({ path: 'user', select: '-password' })
		return this.applyQueryOptions(dataGeoLocation, option)
	}
}
