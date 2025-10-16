import { TOptionQuery } from '@/shared/model/types/optionQuery'
import { Model, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { counterpartySchema } from '../models/schema/CounterpartySchema'
import { TCounterparty } from '../models/types/Types'

export default class ControllerCounterpartyDB extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private counterpartyModel: Model<TCounterparty> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init model counterparty from INN :${this.INN}`)

		this.counterpartyModel = this.dbConnection.model<TCounterparty>('counterParty', counterpartySchema)
	}

	private async changeReadinessModel() {
		if (!this.counterpartyModel) await this.initModel()
	}

	public async addNewCounterparty(data: Omit<TCounterparty, '_id'>) {
		await this.changeReadinessModel()
		const newCounterparty = new this.counterpartyModel!(data)
		await newCounterparty.save()
	}

	public async removeCounterparty(_id: Types.ObjectId) {
		await this.changeReadinessModel()
		await this.counterpartyModel!.updateOne({ _id }, { $set: { safeDeleted: true } })
	}

	public async getAllCounterparty(option?: TOptionQuery<TCounterparty>): Promise<TCounterparty[]> {
		await this.changeReadinessModel()
		const data = this.counterpartyModel!.find({ safeDeleted: false })
		return await this.applyQueryOptions(data, option).exec()
	}

	public async getAllCounterpartyWithDeleted(option?: TOptionQuery<TCounterparty>): Promise<TCounterparty[]> {
		await this.changeReadinessModel()
		const data = this.counterpartyModel!.find({})
		return await this.applyQueryOptions(data, option).exec()
	}
	public async updateCounterparty(data: TCounterparty) {
		await this.changeReadinessModel()
		const { _id } = data
		await this.counterpartyModel!.findOneAndUpdate({ _id }, data)
	}
	public async getCounterpartyByID(_id: Types.ObjectId): Promise<TCounterparty | null> {
		await this.changeReadinessModel()
		return await this.counterpartyModel!.findOne({ _id })
	}
	public async restoreCounterparty(_id: Types.ObjectId) {
		await this.changeReadinessModel()
		await this.counterpartyModel!.updateOne({ _id }, { $set: { safeDeleted: true } })
	}

	public async deletedRequisites(_id: Types.ObjectId) {
		await this.changeReadinessModel()
		await this.counterpartyModel!.findOneAndUpdate({ _id }, { $set: { srcRequisites: 'NOT_FOUND' } })
	}

	public async searchCounterparty(regEx: RegExp, withDeleted: boolean): Promise<TCounterparty[] | null> {
		await this.changeReadinessModel()
		const data = this.counterpartyModel!.find({
			$or: [
				{ phone: regEx },
				{ INN: regEx },
				{ name: regEx },
				{ email: regEx },
				{ data: { $elemMatch: { description: RegExp } } },
			],
		})

		if (withDeleted) {
			return await data.find({})
		} else {
			return await data.find({ safeDeleted: false })
		}
	}

	public async getCounterpartyByListID(_ids: Types.ObjectId[]): Promise<TCounterparty[]> {
		await this.changeReadinessModel()
		return await this.counterpartyModel!.find({ _id: { $in: _ids } }).exec()
	}
}
