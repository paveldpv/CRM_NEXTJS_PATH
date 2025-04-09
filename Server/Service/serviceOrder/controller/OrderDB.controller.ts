import { ObjectId } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { TOrder } from '../model/types/Types'
import modelOrder from '../model/schema/orderSchema'

export default class ControllerOrder extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	public async addOrder(data: Omit<TOrder, '_id' | 'safeDeleted' | 'complied'>): Promise<void> {
		await this.contentDB()
		const newOrder = new modelOrder(data)
		await newOrder.save()
	}

	public async restoreOrder(IDOrder: ObjectId): Promise<void> {
		await this.contentDB()
		await modelOrder.findOneAndUpdate({ _id: IDOrder }, { $set: { safeDeleted: false } })
	}

	public async removeOrder(IDOrder: ObjectId): Promise<void> {
		await this.contentDB()
		await modelOrder.findOneAndUpdate({ _id: IDOrder }, { $set: { safeDeleted: true } })
	}
	public async getOrders(params: {
		complied: boolean
		deleted: boolean
		range?: number
	}): Promise<null | TOrder[]> {
		await this.contentDB()
		if (params.range) {
			return await modelOrder
				.find({ safeDeleted: params.deleted, complied: params.complied })
				.populate('counterparty')
				.skip(params.range - 5)
				.limit(5)
		} else {
			return await modelOrder.find({ safeDeleted: params.deleted, complied: params.complied })
		}
	}
	public async searchOrderByDate(rangeDate: {
		dateStart: Date
		dateEndDate: Date
	}): Promise<TOrder[] | null> {
		const { dateStart, dateEndDate } = rangeDate
		await this.contentDB()
		return await modelOrder
			.find({ 'service.deadlines.startDate': { $gte: dateStart, $lte: dateEndDate } })
			.populate('counterparty')
	}
	public async updateOrder(dataOrder: TOrder): Promise<void> {
		await this.contentDB()
		await modelOrder.findOneAndUpdate({ _id: dataOrder._id }, dataOrder)
	}

	public async endOrder(dateEnd: Date, idOrder: ObjectId): Promise<void> {
		await this.contentDB()
		modelOrder.findOneAndUpdate(
			{ _id: idOrder },
			{ $set: { complied: true, 'service.deadlines.endDate': dateEnd } }
		)
	}

	public async getOrderByID(idOrder: ObjectId): Promise<null | TOrder> {
		await this.contentDB()
		return await modelOrder.findOne({ _id: idOrder }).populate('counterparty')
	}

	//TODO:
	public async addDetailByOrder(idOrder: ObjectId, idDetail: ObjectId): Promise<void> {}
	public async removeDetailByOrder(idOrder: ObjectId, idDetail: ObjectId): Promise<void> {}

	public async getLastNumberOrder(): Promise<number | null> {
		await this.contentDB()
		const lastNumber = await modelOrder
			.findOne()
			.sort({ 'service.deadlines.startDate': -1 })
			.select('numberOrder')
		return lastNumber as number | null
	}
}
