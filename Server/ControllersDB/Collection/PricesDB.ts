import { TDataTablePrice } from '@/entities/price/model/Types'
import { connect } from 'mongoose'
import ContextOrganization from '../../classes/contextOrganization'
import modelPrice from '../SCHEMAS/PricesSchema'

export default class ControllerDBPrice extends ContextOrganization {
	constructor(INN: string) {
		super(INN)
	}

	public async getPriceByID(idTable: string): Promise<TDataTablePrice | null> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelPrice.findOne({ idTable })
	}
	public async getListInfoPrices(): Promise<null | Omit<TDataTablePrice, 'data' | 'optionDescriptionTable'>[]> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelPrice.find({}, { idTable: 1, nameTable: 1 })
	}
	public async addNewPrice(dataTable: TDataTablePrice): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const newPrice = new modelPrice(dataTable)
		await newPrice.save()
	}
	public async deletedPrice(idTable: string): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelPrice.findOneAndDelete({ idTable })
	}
	public async updatePrice(dataTable: TDataTablePrice): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelPrice.findOneAndUpdate({ idTable: dataTable.idTable }, dataTable)
	}
	public async renamePrice(newNamePrice: string, idPrice: string): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelPrice.findOneAndUpdate({ idTable: idPrice }, { nameTable: newNamePrice })
	}
}
