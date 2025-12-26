import { Model, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { propertyDetailSchema } from '../model/schema/propertyDetailSchema'
import { TPropertyDetail } from '../model/types/Types'

export default class ControllerPropertyDetail extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}
	private propertyDetailModel:Model<TPropertyDetail>|null = null

	private async initModel(){
		this.connectDB()
		if(!this.dbConnection)throw new Error(`error init model property detail from INN:${this.INN}`)

			this.propertyDetailModel = this.dbConnection.model<TPropertyDetail>('propertyDetail',propertyDetailSchema)
	}

	private async changeReadinessModel(){
		if(!this.propertyDetailModel) await this.initModel()
	}

	public async searchProperty(dataSearch: RegExp) {
		await this.changeReadinessModel()
		return await this.propertyDetailModel!.find({ property: dataSearch })
	}

	public async addNewProperty(property: string) {
		await this.changeReadinessModel()
		const newProperty = new this.propertyDetailModel!({ property })
		await newProperty.save()
	}

	public async removeProperty(_id: Types.ObjectId) {
		await this.changeReadinessModel()
		await this.propertyDetailModel!.findOneAndDelete({ _id })
	}

	public async getProperty():Promise<TPropertyDetail[]|null> {
		await this.changeReadinessModel()
		return await this.propertyDetailModel!.find({})
	}
}
