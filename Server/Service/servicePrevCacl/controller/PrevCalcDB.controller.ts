import { TRequestPrevCalc } from '@/shared/model/types/subtypes/TRequestPrevCalc'

import ControllerDB from '../../../classes/ControllerDB'
import modelPrevCalc from '../model/schema/PrevCalcSchema'

export default class ControllerPrevCalDB extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	public async saveRequest(dataPrevCalc: TRequestPrevCalc): Promise<void> {
		await this.contentDB()
		const prevRequest = new modelPrevCalc(dataPrevCalc)
		await prevRequest.save()
	}

	public async deletedRequest(idRequest: string): Promise<void> {
		await this.contentDB()
		await modelPrevCalc.findOneAndUpdate({ idRequest: idRequest }, { safeDelete: false })
	}
	public async getAllRequest(): Promise<TRequestPrevCalc[] | []> {
		await this.contentDB()
		return await modelPrevCalc.find({}, { safeDeleted: false })
	}

	public async getRequestGivenRange(range: number): Promise<TRequestPrevCalc[] | []> {
		await this.contentDB()
		return await modelPrevCalc
			.find({}, { safeDeleted: false })
			.find({})
			.skip(range - 5)
			.limit(5)
	}

	public async getAllRequestWithDeleted(): Promise<TRequestPrevCalc[] | []> {
		await this.contentDB()
		return await modelPrevCalc.find({})
	}

	public async getFavoriteRequest(): Promise<TRequestPrevCalc[] | []> {
		await this.contentDB()
		return await modelPrevCalc.find({}, { favorites: true })
	}

	public async getFavoriteRequestGiveRange(range: number): Promise<TRequestPrevCalc[] | []> {
		await this.contentDB()
		return await modelPrevCalc
			.find({}, { favorites: true })
			.find({}, { safeDeleted: false })
			.find({})
			.skip(range - 5)
			.limit(5)
	}

	public async setFavoriteRequest(idRequest: string): Promise<void> {
		await this.contentDB()
		await modelPrevCalc.findOneAndUpdate({ idRequest: idRequest }, { favorites: true })
	}
	public async disableFavoriteRequest(idRequest: string): Promise<void> {
		await this.contentDB()
		await modelPrevCalc.findOneAndUpdate({ idRequest: idRequest }, { favorites: false })
	}

	public async getRequestByINN(INN: string): Promise<TRequestPrevCalc | null> {
		await this.contentDB()
		return await modelPrevCalc.findOne({ 'dataClient.INN': INN })
	}

	public async getRequestByPhone(phone: string): Promise<TRequestPrevCalc[] | []> {
		await this.contentDB()
		const RegExPhone = new RegExp(phone)
		return await modelPrevCalc.find({
			'dataClient.phone': { $regex: RegExPhone, $option: 'i' },
		})
	}

	public async getRequestByEmail(email: string): Promise<TRequestPrevCalc[] | []> {
		await this.contentDB()
		const RegExEmail = new RegExp(email)
		return await modelPrevCalc.find({
			'dataClient.email': { $regex: RegExEmail, $option: 'i' },
		})
	}
}
