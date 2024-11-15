import { TDataOrganization, TNameOrganization } from '@/shared/model/types/subtypes/TOrganization'
import { connect } from 'mongoose'

import ContextOrganization from '../../classes/contextOrganization'
import modelOrganization from '../SCHEMAS/SchemaOrganization/OrganizationSchema'

export default class ControllerDBRuleOrganization extends ContextOrganization {
	constructor(INN: string) {
		super(INN)
	}

	public async getNameOrganization(): Promise<{ nameOrganization: TNameOrganization } | null> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelOrganization.findOne({ INN: this.INN }, { nameOrganization: 1, _id: 0 })
	}

	public async getInfoOrganization(): Promise<TDataOrganization | null> {
		await connect(`${process.env.DB_URL}${this.INN}`)

		return await modelOrganization.findOne({ INN: this.INN })
	}

	public async updateInfoOrganization(newInfo: TDataOrganization) {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelOrganization.findOneAndUpdate({ INN: this.INN }, newInfo)
	}
	public async addInfoOrganization(data: Partial<TDataOrganization>) {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const newOrganization = new modelOrganization(data)
		await newOrganization.save()
	}
}
