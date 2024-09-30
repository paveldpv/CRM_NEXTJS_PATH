import { TConfigAPP } from '@/Types/subtypes/TAppearanceConfigApp'
import { connect } from 'mongoose'
import ContextOrganization from '../../classes/contextOrganization'
import modelConfig from '../SCHEMAS/configAppSchema'

export default class ControllerDBConfigApp extends ContextOrganization {
	constructor(INN: string) {
		super(INN)
	}

	public async getPersonalConfigApp(
		idUser: string
	): Promise<TConfigAPP | null> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelConfig.findOne({ idUser }, { _id: 0 })
	}
	
	

	public async updatePersonalConfigApp(
		newDataConfig: TConfigAPP
	): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelConfig.findOneAndUpdate(
			{ idUser: newDataConfig.idUser },
			newDataConfig
		)
	}

	public async addNewPersonalConfigApp(
		newDataConfig: TConfigAPP
	): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const dataConfig = new modelConfig(newDataConfig)
		await dataConfig.save()
	}
}
