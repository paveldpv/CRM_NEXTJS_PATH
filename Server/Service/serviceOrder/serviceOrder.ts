import { TError } from '@/shared/model/types/subtypes/TError'
import { format } from 'date-fns'

import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'
import { Types } from 'mongoose'
import { Service } from '../../classes/Service'
import ControllerOrder from './controller/OrderDB.controller'
import { TNewOrder, TOrder, TOrderFullInfo } from './model/types/Types'

export class ServiceOrder extends Service {
	constructor(INN: string) {
		super(INN)
	}
	private async nextNumberOrder(): Promise<number> {
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			const lastNumberOrder = await controllerOrder.getLastNumberOrder()
			return lastNumberOrder ? lastNumberOrder + 1 : 1
		} catch (error) {
			throw error
		}
	}

	public async createOrder(dataNewOrder: TNewOrder): Promise<TOrder | TError> {
		try {
			const dataOrder: Omit<TOrder, '_id' | 'safeDeleted' | 'complied'> = {
				...dataNewOrder,
				numberOrder: await this.nextNumberOrder(),
			}
			const controllerOrder = new ControllerOrder(this.INN)
			const saveOrder = await controllerOrder.addOrder(dataOrder)
			return this.normalizeDataFromMongoDB(saveOrder)
		} catch (error) {
			return this.createError(`error create new order , data order :${dataNewOrder} ,INN:${this.INN} , error :${error}`)
		}
	}
	public async restoreOrder(idOrder: Types.ObjectId): Promise<void | TError> {
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			await controllerOrder.restoreOrder(idOrder)
		} catch (error) {
			return this.createError(` error restore order , ID order :${idOrder}, INN:${this.INN} error ${error}`)
		}
	}
	public async removeOrder(idOrder: Types.ObjectId): Promise<void | TError> {
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			await controllerOrder.removeOrder(idOrder)
		} catch (error) {
			return this.createError(`error remove order, id order :${idOrder} INN:${this.INN} , error :${error}`)
		}
	}

	public async getOrders(params: {
		complied: boolean
		deleted: boolean
		option: TOptionQuery<TOrder>
	}): Promise<TOrderFullInfo[] | TError | null> {
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			const data = await controllerOrder.getOrders(params)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(`error get order , params get order :${params} , INN:${this.INN} ,error :${error}`)
		}
	}

	public async searchOrderByDate(rangeDate: {
		dateStart: Date
		dateEndDate: Date
	}): Promise<TOrderFullInfo[] | null | TError> {
		

		try {
			const controllerOrder = new ControllerOrder(this.INN)
			const dataOrder = await controllerOrder.searchOrderByDate(rangeDate)
			return this.normalizeDataFromMongoDB(dataOrder)
		} catch (error) {
			return this.createError(
				`error search order by date , range date :start data : ${format(
					rangeDate.dateStart,
					'MM/dd/yyyy'
				)} end date ${format(rangeDate.dateEndDate, 'MM/dd/yyyy')} , INN:${this.INN} , error :${error}`
			)
		}
	}

	public async updateOrder(data: TOrder): Promise<void | TError> {
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			await controllerOrder.updateOrder(data)
		} catch (error) {
			return this.createError(`error update order , INN :${this.INN} , data update order :${data}, error :${error}`)
		}
	}

	public async getOrderByID(idOrder: Types.ObjectId): Promise<TOrder | TError | null> {
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			const data = controllerOrder.getOrderByID(idOrder)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(`error get order by id , INN:${this.INN} , id order :${idOrder}, error :${error}`, error)
		}
	}

	public async addDetailByOrder(idOrder: Types.ObjectId, idDetail: Types.ObjectId): Promise<void | TError> {
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			await controllerOrder.addDetailByOrder(idOrder, idDetail)
		} catch (error) {
			return this.createError(
				`error add detail  , id detail :${idDetail} , id Order :${idOrder} , INN:${this.INN}`,
				error
			)
		}
	}
	public async removeDetailByOrder(idOrder: Types.ObjectId, idDetail: Types.ObjectId):Promise<void|TError> {
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			await controllerOrder.removeDetailByOrder(idOrder, idDetail)
		} catch (error) {
			return this.createError(
				`error remove detail by order by order INN:${this.INN} id detail :${idDetail} , id Order :${idOrder}`,
				error
			)
		}
	}

	public async updateProcessOrder(idOrder: Types.ObjectId): Promise<void | TError> {
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			await controllerOrder.updateProcessOrder(idOrder)
		} catch (error) {
			return this.createError(`error update process order ,id order :${idOrder.toString()}, INN :${this.INN}`, error)
		}
	}

	public async completedOrder(idOrder: Types.ObjectId) {
		const date = new Date()
		try {
			const controllerOrder = new ControllerOrder(this.INN)
			await controllerOrder.completedOrder(idOrder, date)
		} catch (error) {
			return this.createError(`error update process order ,id order :${idOrder.toString()}, INN :${this.INN}`, error)
		}
	}
}
