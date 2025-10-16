import { Model, Types } from 'mongoose'
//import ContextOrganization from '../../classes/contextOrganization'
import ControllerDB from '../../../classes/ControllerDB'
import { pricesSchema } from '../model/schema/PricesSchema'
import { TDataNewTablePrice, TDataTablePrice } from '../model/types/Types'

export default class ControllerDBPrice extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private modelPrice: Model<TDataTablePrice> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init model price from INN:${this.INN}`)

		this.modelPrice = this.dbConnection.model<TDataTablePrice>('price', pricesSchema)
	}

	private async changeReadinessModel() {
		if (!this.modelPrice) await this.initModel()
	}

	public async getPriceByID(_id: Types.ObjectId): Promise<TDataTablePrice | null> {
		await this.changeReadinessModel()
		return await this.modelPrice!.findOne({ _id })
	}
	public async getListInfoPrices(): Promise<
		null | Omit<TDataTablePrice, 'data' | 'optionDescriptionTable'>[]
	> {
		await this.changeReadinessModel()
		return await this.modelPrice!.find({}, { _id: 1, nameTable: 1 })
	}
	public async addNewPrice(dataTable: TDataNewTablePrice): Promise<TDataTablePrice> {
		await this.changeReadinessModel()
		const newPrice = new this.modelPrice!(dataTable)
		await newPrice.save()
		return newPrice
	}
	public async deletedPrice(_id: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelPrice!.findOneAndDelete({ _id })
	}
	public async updatePrice(dataTable: TDataTablePrice): Promise<void> {
		await this.changeReadinessModel()
		await this.modelPrice!.findOneAndUpdate({ _id: dataTable._id }, dataTable)
	}
	public async renamePrice(newNamePrice: string, _id: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelPrice!.findOneAndUpdate({ _id }, { nameTable: newNamePrice })
	}
}
