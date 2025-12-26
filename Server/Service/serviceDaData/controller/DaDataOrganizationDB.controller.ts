import { Model, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { DaDataOrganizationSchema } from '../model/schema/OrganizationDaDataSchema'
import { TDaDataOrganization } from '../model/types/Type'

export default class ControllerDaDataOrganizationDB extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private daDataOrganizationModel: Model<TDaDataOrganization> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error('error init model daData organization')

		this.daDataOrganizationModel = this.dbConnection.model<TDaDataOrganization>(
			'daDataOrganization',
			DaDataOrganizationSchema
		)
	}

	private async changeReadinessModel() {
		if (!this.daDataOrganizationModel) await this.initModel()
	}

	public async addDaData(data: Partial<TDaDataOrganization>) {
		await this.changeReadinessModel()
		const newOrganization = new this.daDataOrganizationModel!(data)
		await newOrganization.save()
	}

	public async getDaDataByINN(INN: string): Promise<TDaDataOrganization | null> {
		await this.changeReadinessModel()
		const daData = await this.daDataOrganizationModel!.findOne({ 'data.inn': INN }, { _id: 0 })
		return daData
	}

	public async getAllDaData(): Promise<TDaDataOrganization[] | []> {
		await this.changeReadinessModel()
		return await this.daDataOrganizationModel!.find({}, { safeDeleted: false })
	}

	public async deletedDaDataByINN(INN: string): Promise<void> {
		await this.changeReadinessModel()
		await this.daDataOrganizationModel!.findOneAndUpdate(
			{ 'data.inn': INN },
			{ $set: { safeDeleted: false } }
		)
	}

	public async updateDaDataByINN(idCurrentDaData:Types.ObjectId,newDaData: TDaDataOrganization): Promise<void> {
		await this.changeReadinessModel()
		await this.daDataOrganizationModel!.findOneAndUpdate({ _id:idCurrentDaData }, newDaData)
	}
	public async getDataRuleOrganization(): Promise<TDaDataOrganization | null> {
		await this.changeReadinessModel()
		return this.daDataOrganizationModel!.findOne({ 'data.inn': this.INN })
	}

	public async getAllDaDataWithDeleted(): Promise<TDaDataOrganization[] | []> {
		await this.changeReadinessModel()
		return this.daDataOrganizationModel!.find({})
	}
}
