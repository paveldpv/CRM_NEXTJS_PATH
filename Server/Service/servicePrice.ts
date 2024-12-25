import { TDataTablePrice, TPrice, TValueCell, TValueTablePrice } from '@/entities/price/model/Types'
import { idLink, ROOT_LINK } from '@/shared/model/types/enums'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TLink } from '@/shared/model/types/Types'
import uniqid from 'uniqid'
import { Service } from '../classes/Service'
import ControllerDBPrice from './../ControllersDB/Collection/PricesDB'
import ServicePermissionRedactData from './ServicePermissionRedactData'

export class ServicePrice extends Service {
	constructor(INN: string) {
		super(INN)
	}
	private createVoidDataTable(countRow = 0): TValueTablePrice {
		const newDataRow: TValueCell[] = new Array(countRow).fill(0).map((_) => ({ value: '' }))
		return [newDataRow]
	}

	private createVoidTable(nameTable = 'прайс', initialPrice?: boolean): TDataTablePrice {
		return {
			data: this.createVoidDataTable(),
			nameTable,
			idTable: initialPrice ? 'initialPrice' : uniqid(),
			optionDescriptionTable: [],
		}
	}

	public async getPriceByID(idTable: string, phone: string): Promise<TError | TPrice> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)

			const servicePermission = new ServicePermissionRedactData(this.INN, ROOT_LINK.price)
			const permission = await servicePermission.PermissionByPhone(phone)
			const price = await controllerDBPrice.getPriceByID(idTable)

			if (price) {
				return {
					price: this.normalizeDataFromMongoDB(price),
					readonly: permission,
				}
			} else if (!price && idTable === 'initialPrice') {
				const newInitialPrice = this.createVoidTable('прайс', true)
				await controllerDBPrice.addNewPrice(newInitialPrice)
				return {
					price: newInitialPrice,
					readonly: permission,
				}
			} else {
				const er: TError = {
					error: true,
					message: `price not found , id price :${idTable}`,
				}
				return er
			}
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error get price by id ,idTable : ${idTable}, error :${error}`,
			}
			this.logError(er)
			return er
		}
	}

	public async getListInfoPrices(): Promise<TError | TLink[]> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			const listInfoPrices = await controllerDBPrice.getListInfoPrices()
			if (!listInfoPrices) {
				const er: TError = {
					error: true,
					message: `error get list info prices , list info prices is NULL `,
				}
				this.logError(er)
				return er
			}
			const normalizeData = this.normalizeDataFromMongoDB(listInfoPrices)
			return normalizeData.map((el) => ({
				href: `price/${el.idTable}`,
				description: '',
				title: el.nameTable,
				id: idLink.table,
			}))
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error get list info prices , error :${error}`,
			}
			this.logError(er)
			return er
		}
	}

	public async addNewPrice(nameTable: string): Promise<TError | TDataTablePrice> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			const newVoidTable = this.createVoidTable(nameTable)
			await controllerDBPrice.addNewPrice(newVoidTable)
			return newVoidTable
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error add new price , name new table : ${nameTable} error  :${error}`,
			}
			this.logError(er)
			return er
		}
	}

	public async updatePrice(dataTable: TDataTablePrice): Promise<TError | void> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			await controllerDBPrice.updatePrice(dataTable)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error update update data table : ${dataTable} error :${error}`,
			}
			this.logError(er)
			return er
		}
	}
	public async deletedPrice(idTable: string): Promise<TError | void> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			await controllerDBPrice.deletedPrice(idTable)
		} catch (error) {
			const er: TError = {
				error: true,
				message: ` error deleted price , id removing price ${idTable} error :${error}`,
			}
			this.logError(er)
			return er
		}
	}
	public async renamePrice(newNamePrice: string, idPrice: string): Promise<TError | void> {
		try {
			const controllerDBPrice = new ControllerDBPrice(this.INN)
			await controllerDBPrice.renamePrice(newNamePrice, idPrice)
		} catch (error) {
			const er: TError = {
				error: true,
				message: `error rename price ,new Name price :${newNamePrice},id price :${idPrice}`,
			}
			this.logError(er)
			return er
		}
	}
}
