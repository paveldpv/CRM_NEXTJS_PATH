import { TRequestPrevCalc } from '@/shared/model/types/subtypes/TRequestPrevCalc'
import { connect } from 'mongoose'
import ContextOrganization from '../../classes/contextOrganization'
import modelPrevCalc from '../SCHEMAS/PrevCalcSchema'

export default class ControllerDBPRevCalcApplication extends ContextOrganization {
	constructor(INN: string) {
		super(INN)
	}

	public async saveRequest(dataPrevCalc: TRequestPrevCalc): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const prevRequest = new modelPrevCalc(dataPrevCalc)
		await prevRequest.save()
	}

	public async deletedRequest(idRequest: string): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelPrevCalc.findOneAndUpdate({ idRequest: idRequest }, { safeDelete: false })
	}
	public async getAllRequest(): Promise<TRequestPrevCalc[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelPrevCalc.find({}, { safeDeleted: false })
	}

	public async getRequestGivenRange(range: number): Promise<TRequestPrevCalc[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelPrevCalc
			.find({}, { safeDeleted: false })
			.find({})
			.skip(range - 5)
			.limit(5)
	}

	public async getAllRequestWithDeleted(): Promise<TRequestPrevCalc[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelPrevCalc.find({})
	}

	public async getFavoriteRequest(): Promise<TRequestPrevCalc[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelPrevCalc.find({}, { favorites: true })
	}

	public async getFavoriteRequestGiveRange(range: number): Promise<TRequestPrevCalc[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelPrevCalc
			.find({}, { favorites: true })
			.find({}, { safeDeleted: false })
			.find({})
			.skip(range - 5)
			.limit(5)
	}

	public async setFavoriteRequest(idRequest: string): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelPrevCalc.findOneAndUpdate({ idRequest: idRequest }, { favorites: true })
	}
	public async disableFavoriteRequest(idRequest: string): Promise<void> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		await modelPrevCalc.findOneAndUpdate({ idRequest: idRequest }, { favorites: false })
	}

	public async getRequestByINN(INN: string): Promise<TRequestPrevCalc | null> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		return await modelPrevCalc.findOne({ 'dataClient.INN': INN })
	}

	public async getRequestByPhone(phone: string): Promise<TRequestPrevCalc[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const RegExPhone = new RegExp(phone)
		return await modelPrevCalc.find({
			'dataClient.phone': { $regex: RegExPhone, $option: 'i' },
		})
	}

	public async getRequestByEmail(email: string): Promise<TRequestPrevCalc[] | []> {
		await connect(`${process.env.DB_URL}${this.INN}`)
		const RegExEmail = new RegExp(email)
		return await modelPrevCalc.find({
			'dataClient.email': { $regex: RegExEmail, $option: 'i' },
		})
	}
}
