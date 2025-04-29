

import { TError } from '@/shared/model/types/subtypes/TError'
import { TResponseUploadFiles } from '@/shared/model/types/Types'
import { ObjectId } from 'mongoose'
import { Service } from '../../classes/Service'
import { ServiceOrder } from '../serviceOrder/serviceOrder'
import { ControllerDetail } from './controller/detailsDB.controller'
import { TDetail, TNewDetail } from './model/types/Types'

export class ServiceDetails extends Service {
	constructor(INN: string) {
		super(INN)
	}

	public async addDetailForOrder(newDetail: TNewDetail): Promise<void | TError> {
		try {
			const controllerDetail = new ControllerDetail(this.INN)
			await controllerDetail.addDetailForOrder(newDetail)
		} catch (error) {
			return this.createError(`error add detail , data new detail :${newDetail}, INN:${this.INN}`, error)
		}
	}

	public async removeDetailFromOrder(idOrder: ObjectId, idDetail: ObjectId): Promise<void | TError> {
		try {
			const controllerDetail = new ControllerDetail(this.INN)
			const serviceOrder = new ServiceOrder(this.INN)
			await Promise.all([
				controllerDetail.removeDetailFromOrder(idDetail),
				serviceOrder.removeDetailByOrder(idOrder, idDetail),
			])
		} catch (error) {
			return this.createError(
				`error remove detail from order , id order :${idOrder} , id Detail :${idDetail} , INN:${this.INN}`,
				error
			)
		}
	}

	public async getDetailFromOrderWithDeleted(
		idOrder: ObjectId
	): Promise<null | [] | TError | TDetail[]> {
		try {
			const controllerDetail = new ControllerDetail(this.INN)
			const data = await controllerDetail.getDetailFromOrderWithDeleted(idOrder)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(
				`get detail from order with deleted , id order ${idOrder}, INN :${this.INN}`,
				error
			)
		}
	}

	public async restoreDetail(idDetail: ObjectId, idOrder: ObjectId): Promise<void | TError> {
		try {
			const controllerDetail = new ControllerDetail(this.INN)
			const serviceOrder = new ServiceOrder(this.INN)
			await Promise.all([
				controllerDetail.restoreDetail(idDetail),
				serviceOrder.addDetailByOrder(idOrder, idDetail),
			])
		} catch (error) {
			return this.createError(`error restore detail id Detail :${idDetail} INN:${this.INN}`, error)
		}
	}

	public async searchDetail(req: string, idOrder?: ObjectId): Promise<null | TError | [] | TDetail[]> {
		const regex = new RegExp(req, 'i')
		try {
			const controllerDetail = new ControllerDetail(this.INN)
			const data = controllerDetail.searchDetail(regex, idOrder)
			return this.normalizeDataFromMongoDB(data)
		} catch (error) {
			return this.createError(
				`error search detail request :${req}, id order ${idOrder} , INN:${this.INN}`,
				error
			)
		}
	}

	public async updateDataFromDetail(idDetail: ObjectId, data: TDetail): Promise<void | TError> {
		try {
			const controllerDetail = new ControllerDetail(this.INN)
			await controllerDetail.updateDataForDetail(idDetail, data)
		} catch (error) {
			return this.createError(
				` error update date detail id detail :${idDetail} , data :${data} , INN:${this.INN} `,
				error
			)
		}
	}

	public async addFilesFromDetail(
		idDetail: ObjectId,
		files: TResponseUploadFiles[]
	): Promise<void | TError> {
		try {
			const controllerDetail = new ControllerDetail(this.INN)
			await controllerDetail.addFilesFromDetail(idDetail, files)
		} catch (error) {
			return this.createError(
				`error add files from detail , id detail :${idDetail}, files :${files} , INN:${this.INN}`,
				error
			)
		}
	}

	public async removeFileFromDetail(idDetail: ObjectId, FullPath: string): Promise<void | TError> {
		try {
			const controllerDetail = new ControllerDetail(this.INN)
			await controllerDetail.removeFileFromDetail(idDetail, FullPath)
		} catch (error) {
			return this.createError(
				` error remove file from detail id detail :${idDetail} , full path file :${FullPath},INN:${this.INN}`,
				error
			)
		}
	}
}
