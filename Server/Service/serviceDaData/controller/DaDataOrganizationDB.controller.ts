import { TDaDataOrganization } from '@/shared/model/types/subtypes/TDaDataOrganization'
import { connect } from 'mongoose'
import ContextOrganization from '../../../classes/contextOrganization'
import modelDaDataOrganization from '../model/schema/OrganizationDaDataSchema'

export default class ControllerDaDataOrganizationDB extends ContextOrganization {
	constructor(INN: string) {
		super(INN)
	}

	public async addDaData(data: Partial<TDaDataOrganization>) {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const newOrganization = new modelDaDataOrganization(data)
		await newOrganization.save()
	}

	public async getDaDataByINN(INN: string): Promise<TDaDataOrganization | null> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const daData = modelDaDataOrganization.findOne({ 'data.inn': INN }, { _id: 0 })
		return daData
	}

	public async getAllDaData(): Promise<TDaDataOrganization[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return modelDaDataOrganization.find({}, { safeDeleted: false })
	}

	public async deletedDaDataByINN(INN: string): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelDaDataOrganization.findOneAndUpdate({ 'data.inn': INN }, { $set: { safeDeleted: false } })
	}

	public async updateDaDataByINN(newDaData: TDaDataOrganization): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelDaDataOrganization.findOneAndUpdate({ 'data.inn': newDaData.data.inn }, newDaData)
	}
	public async getDataRuleOrganization(): Promise<TDaDataOrganization | null> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return modelDaDataOrganization.findOne({ 'data.inn': this.INN })
	}

	public async getAllDaDataWithDeleted(): Promise<TDaDataOrganization[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return modelDaDataOrganization.find({}, { _id: 0 })
	}
}
