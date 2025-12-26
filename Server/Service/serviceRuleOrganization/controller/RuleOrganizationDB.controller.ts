import ControllerDB from '../../../classes/ControllerDB'

import { Model } from 'mongoose'
import { organizationSchema } from '../model/schema/OrganizationSchema'
import {
	TDataOrganization,
	TDataOrganizationFullInfo,
	TNameOrganization,
	TNewRuleOrganization,
} from '../model/types/Types'

export default class ControllerDBRuleOrganization extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private modelOrganization: Model<TDataOrganization> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init model organization from INN:${this.INN}`)

		this.modelOrganization = this.dbConnection.model<TDataOrganization>(
			'dataOrganization',
			organizationSchema
		)
	}

	private async changeReadinessModel() {
		if (!this.modelOrganization) await this.initModel()
	}

	public async getNameOrganization(): Promise<{ nameOrganization: TNameOrganization } | null> {
		await this.changeReadinessModel()
		return await this.modelOrganization!.findOne({ INN: this.INN }, { nameOrganization: 1, _id: 0 })
	}

	public async getInfoOrganization(): Promise<TDataOrganizationFullInfo | null> {
		await this.changeReadinessModel()
		return await this.modelOrganization!.findOne({ INN: this.INN }).populate('requisites')
	}

	public async updateInfoOrganization(newInfo: TDataOrganization) {
		await this.changeReadinessModel()
		await this.modelOrganization!.findOneAndUpdate({ INN: this.INN }, newInfo)
	}
	public async addInfoOrganization(data: TNewRuleOrganization) {
		await this.changeReadinessModel()
		const newOrganization = new this.modelOrganization!(data)
		await newOrganization.save()
	}
}
