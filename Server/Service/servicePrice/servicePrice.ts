import { idLink } from '@/shared/model/types/subtypes/enums'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TLink } from '@/shared/model/types/subtypes/Types'
import {
	TDataNewTablePrice,
	TDataTablePrice,
	TPrice,
	TValueCell,
	TValueTablePrice,
} from './model/types/Types'

import { Types } from 'mongoose'
import { Service } from '../../classes/Service'
import { ROOT_LINK } from '../servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../servicePermissionRedactData/ServicePermissionRedactData'
import ControllerDBPrice from './controller/PricesDB.controller'

export class ServicePrice extends Service {
	constructor(INN: string) {
		super(INN)
	}
	private createVoidDataTable(countRow = 0): TValueTablePrice {
		const newDataRow: TValueCell[] = new Array(countRow).fill(0).map((_) => ({ value: '' }))
		return [newDataRow]
	}

	private createVoidTable(nameTable = 'прайс'): TDataNewTablePrice {
		return {
			data: this.createVoidDataTable(),
			nameTable,
			optionDescriptionTable: [],
			safeDeleted: false,
		}
	}

	public async getPriceByID(_id: Types.ObjectId|null, idUser: Types.ObjectId|null): Promise<TError | TPrice> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			const servicePermission = new ServicePermissionRedactData(this.INN, ROOT_LINK.price)
			const permission = idUser ? await servicePermission.Permission(idUser) : false

			

			if (_id) {
				const currentPrice = await controllerDBPrice.getPriceByID(_id)
				return {					
					price: this.normalizeDataFromMongoDB(currentPrice!),
					readonly: !permission,
				}
			} else if (!_id) {
				const newInitialPrice = this.createVoidTable('прайс')
				const newPrice = await controllerDBPrice.addNewPrice(newInitialPrice)
				return {
					price: newPrice,
					readonly: permission,
				}
			} else {
				const er: TError = {
					error: true,
					message: `price not found , id price :${_id}`,
				}
				return er
			}
		} catch (error) {
			return this.createError(`error get price by id ,idTable : ${_id}, error :${error}`, error)
		}
	}

	public async getListInfoPrices(): Promise<TError | TLink[]> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			const listInfoPrices = await controllerDBPrice.getListInfoPrices()
			if (!listInfoPrices) {
				return this.createError(`error get list info prices , list info prices is NULL `)
			}
			
			const normalizeData = this.normalizeDataFromMongoDB(listInfoPrices)
			return normalizeData.map((el) => ({
				href: `price/${el._id.toString()}`,
				description: '',
				title: el.nameTable,
				id: idLink.table,
			}))
		} catch (error) {
			return this.createError(`error get list info prices , error :${error}`, error)
		}
	}

	public async addNewPrice(nameTable: string): Promise<TError | TDataTablePrice> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			const newVoidTable = this.createVoidTable(nameTable)
			const newPrice = await controllerDBPrice.addNewPrice(newVoidTable)
			return this.normalizeDataFromMongoDB(newPrice)
		} catch (error) {
			return this.createError(
				`error add new price , name new table : ${nameTable} error  :${error}`,
				error
			)
		}
	}

	public async updatePrice(dataTable: TDataTablePrice): Promise<TError | void> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			await controllerDBPrice.updatePrice(dataTable)
		} catch (error) {
			return this.createError(`error update update data table : ${dataTable} error :${error}`, error)
		}
	}
	public async deletedPrice(_id: Types.ObjectId): Promise<TError | void> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			await controllerDBPrice.deletedPrice(_id)
		} catch (error) {
			return this.createError(` error deleted price , id removing price ${_id} error :${error}`, error)
		}
	}
	public async renamePrice(newNamePrice: string, _id: Types.ObjectId): Promise<TError | void> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			await controllerDBPrice.renamePrice(newNamePrice, _id)
		} catch (error) {
			return this.createError(
				`error rename price ,new Name price :${newNamePrice},id price :${_id}`,
				error
			)
		}
	}
}
