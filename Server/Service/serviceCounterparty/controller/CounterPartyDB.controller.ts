// import { TCounterparty } from '../../Service/serviceCounterparty/models/types/Types'
// import ControllerDB from '../../classes/ControllerDB'
// import modelCounterparty from '../SCHEMAS/CounterpartySchema'

import ControllerDB from '../../../classes/ControllerDB'
import modelCounterparty from '../models/schema/CounterpartySchema'
import { TCounterparty } from '../models/types/Types'

export default class ControllerCounterpartyDB extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	public async addNewCounterparty(data: Omit<TCounterparty, '_id'>) {
		await this.contentDB()
		const newCounterparty = new modelCounterparty(data)
		await newCounterparty.save()
	}
	public async removeCounterparty(id: string) {
		await this.contentDB()
		await modelCounterparty.updateOne({ id }, { $set: { safeDeleted: true } })
	}
	public async getAllCounterparty(): Promise<TCounterparty[]> {
		await this.contentDB()
		return await modelCounterparty.find({})
	}
	public async updateCounterparty(data: TCounterparty) {
		await this.contentDB()
		const { _id } = data
		await modelCounterparty.findOneAndUpdate({ _id }, data)
	}
	public async getCounterpartyByID(id: string): Promise<TCounterparty | null> {
		await this.contentDB()
		return await modelCounterparty.findOne({ id })
	}
	public async restoreCounterparty(id: string) {
		await this.contentDB()
		await modelCounterparty.updateOne({ id }, { $set: { safeDeleted: true } })
	}

	public async deletedRequisites(id: string) {
		await this.contentDB()
		await modelCounterparty.findOneAndUpdate({ id }, { $set: { srcRequisites: 'NOT_FOUND' } })
	}

	public async searchCounterparty(regEx: RegExp): Promise<TCounterparty[] | null> {
		await this.contentDB()
		return await modelCounterparty.find({
			$or: [
				{ phone: regEx },
				{ INN: regEx },
				{ name: regEx },
				{ email: regEx },
				{ 'data.description': { regEx } },
			],
		})
	}
}
