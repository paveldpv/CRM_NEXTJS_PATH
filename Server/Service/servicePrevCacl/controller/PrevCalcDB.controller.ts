import { TOptionQuery } from '@/shared/model/types/optionQuery'
import { Model, set, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { prevCalcSchema } from '../model/schema/PrevCalcSchema'
import { TDBRequestPrevCalc, TRequestPrevCalc } from '../model/types/Types'

export default class ControllerPrevCalDB extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	private modelPrevCalc: Model<TDBRequestPrevCalc> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init model prev calc from INN :${this.INN}`)

		this.modelPrevCalc = this.dbConnection.model<TDBRequestPrevCalc>('prevCalc', prevCalcSchema)
	}

	private async changeReadinessModel() {
		if (!this.modelPrevCalc) await this.initModel()
	}

	public async saveRequest(dataPrevCalc: TRequestPrevCalc): Promise<void> {
		await this.changeReadinessModel()
		const prevRequest = new this.modelPrevCalc!(dataPrevCalc)
		await prevRequest.save()
	}

	public async deletedRequest(idRequest: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelPrevCalc!.findOneAndUpdate({ _id: idRequest }, { safeDelete: false })
	}

	public async getAllRequest(): Promise<TDBRequestPrevCalc[] | []> {
		await this.changeReadinessModel()
		return await this.modelPrevCalc!.find({}, { safeDeleted: false })
	}

	public async getRequestGivenRange(
		option?: TOptionQuery<TRequestPrevCalc>
	): Promise<TDBRequestPrevCalc[] | []> {
		await this.changeReadinessModel()
		const data = this.modelPrevCalc!.find({})
		return this.applyQueryOptions(data, option)
	}

	public async getAllRequestWithDeleted(): Promise<TDBRequestPrevCalc[]> {
		await this.changeReadinessModel()
		return await this.modelPrevCalc!.find({safeDeleted:true})
	}

	public async getFavoriteRequest(): Promise<TDBRequestPrevCalc[] | []> {
		await this.changeReadinessModel()
		return await this.modelPrevCalc!.find({}, { favorites: true })
	}

	public async getFavoriteRequestGiveRange(
		option?: TOptionQuery<TRequestPrevCalc>
	): Promise<TDBRequestPrevCalc[] | []> {
		await this.changeReadinessModel()
		const data = this.modelPrevCalc!.find({}, { favorites: true }).find({}, { safeDeleted: false })
		return this.applyQueryOptions(data, option)
	}

	public async setFavoriteRequest(idRequest: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelPrevCalc!.findOneAndUpdate({ idRequest: idRequest }, { favorites: true })
	}
	public async disableFavoriteRequest(idRequest: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.modelPrevCalc!.findOneAndUpdate({ idRequest: idRequest }, { favorites: false })
	}

	public async getRequestByINN(INN: string): Promise<TRequestPrevCalc | null> {
		await this.changeReadinessModel()
		return await this.modelPrevCalc!.findOne({ 'dataClient.INN': INN })
	}

	public async getRequestByPhone(phone: string): Promise<TDBRequestPrevCalc[] | []> {
		await this.changeReadinessModel()
		const RegExPhone = new RegExp(phone)
		return await this.modelPrevCalc!.find({
			'dataClient.phone': { $regex: RegExPhone, $option: 'i' },
		})
	}

	public async getRequestByEmail(email: string): Promise<TDBRequestPrevCalc[] | []> {
		await this.changeReadinessModel()
		const RegExEmail = new RegExp(email)
		return await this.modelPrevCalc!.find({
			'dataClient.email': { $regex: RegExEmail, $option: 'i' },
		})
	}

	public async getGetVerifiedRequest(): Promise<TDBRequestPrevCalc[]> {
		await this.changeReadinessModel()
		return await this.modelPrevCalc!.find({safeDeleted:true,verified:false})
	}

	public async setVerifiedRequest(_id:Types.ObjectId):Promise<void>{
		await this.changeReadinessModel()
		await this.modelPrevCalc!.findOneAndUpdate({_id},{$set:{verified:true}})
		return
	}
}
