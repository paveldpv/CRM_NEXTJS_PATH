import { Model, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { TOrder, TOrderFullInfo } from '../model/types/Types'
import { orderSchema } from '../model/schema/orderSchema'
import { TOptionQuery } from '@/shared/model/types/optionQuery'

export default class ControllerOrder extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private modelOrder : Model<TOrder>|null = null

	private async initModel (){
		await this.connectDB()
		if(!this.dbConnection)throw new Error(`error init model order from INN :${this.INN}`)

		this.modelOrder = this.dbConnection.model<TOrder>('order',orderSchema)
	}
	private async changeReadinessModel(){
		if(!this.modelOrder) await this.initModel()
	}

	public async addOrder(data: Omit<TOrder, '_id' | 'safeDeleted' | 'complied'>): Promise<void> {
		await this.changeReadinessModel()
		const newOrder = new this.modelOrder!(data)
		await newOrder.save()
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
		complied: boolean
		deleted: boolean
		option:TOptionQuery<TOrder>
	}): Promise<null | TOrderFullInfo[]> {
		
		await this.changeReadinessModel()
		const modelOrder = this.modelOrder!.find({ safeDeleted: params.deleted, complied: params.complied }).populate('counterparty')
		return this.applyQueryOptions(modelOrder,params.option)
		
	}

	public async searchOrderByDate(rangeDate: {
		dateStart: Date
		dateEndDate: Date
	}): Promise<TOrderFullInfo[] | null> {
		
		const { dateStart, dateEndDate } = rangeDate
		await this.changeReadinessModel()
		return await this.modelOrder!
			.find({ 'service.deadlines.startDate': { $gte: dateStart, $lte: dateEndDate } })
			.populate('counterparty')
	}
	
	public async updateOrder(dataOrder: TOrder): Promise<void> {
	await this.changeReadinessModel()
		await this.modelOrder!.findOneAndUpdate({ _id: dataOrder._id }, dataOrder)
	}

	public async endOrder(dateEnd: Date, idOrder:Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		this.modelOrder!.findOneAndUpdate(
			{ _id: idOrder },
			{ $set: { complied: true, 'service.deadlines.endDate': dateEnd } }
		)
	}

	public async getOrderByID(idOrder: Types.ObjectId): Promise<null | TOrder> {
		await this.changeReadinessModel()
		return await this.modelOrder!.findOne({ _id: idOrder }).populate('counterparty')
	}

	
	public async addDetailByOrder(idOrder: Types.ObjectId, idDetail: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		this.modelOrder!.findOneAndUpdate({_id:idOrder},{$push:{IDDetails:idDetail}})
	}
	public async removeDetailByOrder(idOrder: Types.ObjectId, idDetail: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		this.modelOrder!.findOneAndUpdate({_id:idOrder},{$pull:{IDDetails:idDetail}})
	}

	public async getLastNumberOrder(): Promise<number | null> {
		await this.changeReadinessModel()
		const lastNumber = await this.modelOrder!
			.findOne()
			.sort({ 'service.deadlines.startDate': -1 })
			.select('numberOrder')
		return lastNumber as number | null
	}
}
