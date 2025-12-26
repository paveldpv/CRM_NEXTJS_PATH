import { Model, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { configSchema } from '../model/schema/configAppSchema'
import { TConfigAPP, TNewTConfigApp } from '../model/types/Type'

export default class ControllerDBConfigApp extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private configAppModel: Model<TConfigAPP> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init model config app from INN :${this.INN}`)

		this.configAppModel = this.dbConnection.model<TConfigAPP>('configSchema', configSchema)
	}

	private async changeReadinessModel() {
		if (!this.configAppModel) await this.initModel()
	}

	public async getPersonalConfigApp(idUser: Types.ObjectId): Promise<TConfigAPP | null> {
		await this.changeReadinessModel()
		return await this.configAppModel!.findOne({ idUser })
	}

	public async updatePersonalConfigApp(newDataConfig: TConfigAPP): Promise<void> {
		await this.changeReadinessModel()
		await this.configAppModel!.findOneAndUpdate({ _id: newDataConfig._id }, newDataConfig)
	}

	public async addNewPersonalConfigApp(newDataConfig: TNewTConfigApp): Promise<void> {
		await this.changeReadinessModel()
		const dataConfig = new this.configAppModel!(newDataConfig)
		await dataConfig.save()
	}
}
