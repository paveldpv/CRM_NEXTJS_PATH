import { TDataOrganization, TNameOrganization } from '@/shared/model/types/subtypes/TOrganization'

import ControllerDB from '../../../classes/ControllerDB'
import modelOrganization from '../model/schema/OrganizationSchema'

export default class ControllerDBRuleOrganization extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	public async getNameOrganization(): Promise<{ nameOrganization: TNameOrganization } | null> {
		await this.contentDB()
		return await modelOrganization.findOne({ INN: this.INN }, { nameOrganization: 1, _id: 0 })
	}

	public async getInfoOrganization(): Promise<TDataOrganization | null> {
		await this.contentDB()
		return await modelOrganization.findOne({ INN: this.INN })
	}

	public async updateInfoOrganization(newInfo: TDataOrganization) {
		await this.contentDB()
		await modelOrganization.findOneAndUpdate({ INN: this.INN }, newInfo)
	}
	public async addInfoOrganization(data: Partial<TDataOrganization>) {
		await this.contentDB()
		const newOrganization = new modelOrganization(data)
		await newOrganization.save()
	}
}
