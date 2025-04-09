import { TDataTablePrice } from '@/entities/price/model/Types'
import { connect } from 'mongoose'
//import ContextOrganization from '../../classes/contextOrganization'
import modelPrice from '../model/schema/PricesSchema'
import ControllerDB from '../../../classes/ControllerDB'

export default class ControllerDBPrice extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	public async getPriceByID(idTable: string): Promise<TDataTablePrice | null> {
		await this.contentDB()
		return await modelPrice.findOne({ idTable })
	}
	public async getListInfoPrices(): Promise<null | Omit<TDataTablePrice, 'data' | 'optionDescriptionTable'>[]> {
		await this.contentDB()
		return await modelPrice.find({}, { idTable: 1, nameTable: 1 })
	}
	public async addNewPrice(dataTable: TDataTablePrice): Promise<void> {
		await this.contentDB()
		const newPrice = new modelPrice(dataTable)
		await newPrice.save()
	}
	public async deletedPrice(idTable: string): Promise<void> {
		await this.contentDB()
		await modelPrice.findOneAndDelete({ idTable })
	}
	public async updatePrice(dataTable: TDataTablePrice): Promise<void> {
		await this.contentDB()
		await modelPrice.findOneAndUpdate({ idTable: dataTable.idTable }, dataTable)
	}
	public async renamePrice(newNamePrice: string, idPrice: string): Promise<void> {
		await this.contentDB()
		await modelPrice.findOneAndUpdate({ idTable: idPrice }, { nameTable: newNamePrice })
	}
}
