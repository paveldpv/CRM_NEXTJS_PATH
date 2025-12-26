
import { Model } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'

import { requisitesSchema } from '../model/schema/RequisitesSchema'
import { TNewRequisites, TRequisites } from '../model/types/Type'

export default class ControllerDBRequisites extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private modelRequisites: Model<TRequisites> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init model requisite from INN :${this.INN}`)

		this.modelRequisites = this.dbConnection.model<TRequisites>('requisite', requisitesSchema)
	}

	private async changeReadinessModel(){
		if(!this.modelRequisites) await this.initModel()
	}

	public async addNewRequisites(dataNewRequisites: Partial<TNewRequisites>):Promise<TRequisites> {
		await this.changeReadinessModel()
		const newRequisites = new this.modelRequisites!(dataNewRequisites)
		const saveRequisites = await newRequisites.save()
		return saveRequisites
	}

	public async updateRequisites(data: TRequisites) {
		await this.changeReadinessModel()
		await this.modelRequisites!.updateOne({ _id:data._id }, data)
	}

	public async deleteRequisites(INN: string) {
		await this.changeReadinessModel()
		await this.modelRequisites!.updateOne(
			{ INN: INN },
			{
				$set: {
					safeDeleted: true,
				},
			}
		)
	}

	public async getRequisiteByParams(params: TRequisites): Promise<TRequisites | null> {
		await this.changeReadinessModel()
		return await this.modelRequisites!.findOne(params, { safeDeleted: false })
	}

	public async getAllRequisites(): Promise<TRequisites[]> {
		await this.changeReadinessModel()
		return await this.modelRequisites!.find({})
	}

	public async getRequisitesCurrentOrganization(): Promise<TRequisites> {
		await this.changeReadinessModel()
		const data = (await this.modelRequisites!.findOne(
			{ 'INN.value': this.INN },
			{ _id: 0, __v: 0 }
		).exec()) as TRequisites
		return data
	}
}
