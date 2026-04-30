import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'
import { Model, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { counterpartySchema } from '../../serviceCounterparty/models/schema/CounterpartySchema'
import { userSchema } from '../../serviceUser/model/schema/usersSchema'
import { orderSchema } from '../model/schema/orderSchema'
import { TOrder, TOrderFullInfo } from '../model/types/Types'
export default class ControllerOrder extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private modelOrder: Model<TOrder> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init model order from INN :${this.INN}`)

		// Регистрируем схемы для populate
		this.dbConnection.model('counterparty', counterpartySchema)
		this.dbConnection.model('user', userSchema)

		this.modelOrder = this.dbConnection.model<TOrder>('order', orderSchema)
	}
	private async changeReadinessModel() {
		if (!this.modelOrder) await this.initModel()
	}

	public async addOrder(data: Omit<TOrder, '_id' | 'safeDeleted' | 'complied' | 'details'>): Promise<TOrderFullInfo> {
		await this.changeReadinessModel()
		const newOrder = new this.modelOrder!(data)
		const saveOrder = await newOrder.save()
		const result = await saveOrder.populate(['CounterParty', 'acceptedOfCargoEmployeeId'])

		return result.toObject() as TOrderFullInfo
	}

	public async restoreOrder(IDOrder: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelOrder!.findOneAndUpdate({ _id: IDOrder }, { $set: { safeDeleted: false } })
	}

	public async removeOrder(IDOrder: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelOrder!.findOneAndUpdate({ _id: IDOrder }, { $set: { safeDeleted: true } })
	}
	public async getOrders(params: {
		completed: boolean
		deleted: boolean
		option?: TOptionQuery<TOrder>
		dateStart?: Date
		dateEndDate?: Date
	}): Promise<null | TOrderFullInfo[]> {
		await this.changeReadinessModel()

		const filter: Record<string, unknown> = {
			safeDeleted: params.deleted,
			complied: params.completed,
		}

		if (params.dateStart && params.dateEndDate) {
			filter['service.deadlines.startDate'] = {
				$gte: params.dateStart,
				$lte: params.dateEndDate,
			}
		}

		const modelOrder = this.modelOrder!.find(filter).populate('CounterParty').populate('acceptedOfCargoEmployeeId')

		return this.applyQueryOptions(modelOrder, params.option)
	}

	public async searchOrderByDate(rangeDate: { dateStart: Date; dateEndDate: Date }): Promise<TOrderFullInfo[] | null> {
		const { dateStart, dateEndDate } = rangeDate
		await this.changeReadinessModel()
		return await this.modelOrder!.find({ 'service.deadlines.startDate': { $gte: dateStart, $lte: dateEndDate } })
			.populate('CounterParty')
			.populate('acceptedOfCargoEmployeeId')
	}

	public async updateOrder(dataOrder: TOrder): Promise<void> {
		await this.changeReadinessModel()
		await this.modelOrder!.findOneAndUpdate({ _id: dataOrder._id }, dataOrder)
	}

	public async getOrderByID(idOrder: Types.ObjectId): Promise<null | TOrderFullInfo> {
		await this.changeReadinessModel()
		return await this.modelOrder!.findOne({ _id: idOrder }).populate('CounterParty').populate('acceptedOfCargoEmployeeId')
	}
	public async addDetailByOrder(idOrder: Types.ObjectId, idDetail: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelOrder!.findOneAndUpdate({ _id: idOrder }, { $push: { IDDetails: idDetail } })
	}
	public async removeDetailByOrder(idOrder: Types.ObjectId, idDetail: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelOrder!.findOneAndUpdate({ _id: idOrder }, { $pull: { IDDetails: idDetail } })
	}

	public async getLastNumberOrder(): Promise<number | null> {
		await this.changeReadinessModel()
		const lastNumber = await this.modelOrder!.findOne().sort({ 'service.deadlines.startDate': -1 }).select('numberOrder')
		return lastNumber?.numberOrder ?? null
	}
	public async updateProcessOrder(idOrder: Types.ObjectId) {
		await this.changeReadinessModel()
		await this.modelOrder!.findOneAndUpdate({ _id: idOrder }, { $inc: { processCompleted: 1 } })
		return
	}
	public async completedOrder(idOrder: Types.ObjectId, dateEnd: Date) {
		await this.changeReadinessModel()
		await this.modelOrder!.findOneAndUpdate({ _id: idOrder }, { $set: { complied: true, 'service.deadlines.endDate': dateEnd } })
		return
	}
	public async getAmountOrder({ completed, deleted }: { completed: boolean; deleted: boolean }): Promise<number> {
		await this.changeReadinessModel()
		const amount = await this.modelOrder!.countDocuments({ safeDeleted: deleted, complied: completed })
		return amount
	}
}
