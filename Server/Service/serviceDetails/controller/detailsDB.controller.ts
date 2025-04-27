import { ObjectId } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import modelDetail from '../model/schema/detailSchema'
import { TDetail, TNewDetail } from '../model/types/Types'

export class ControllerDetail extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	public async addDetailForOrder(newDetail: TNewDetail): Promise<void> {
		await this.contentDB()
		const _newDetail = new modelDetail(newDetail)
		await _newDetail.save()
	}
	public async removeDetailFromOrder(_id: ObjectId): Promise<void> {
		await this.contentDB()
		await modelDetail.findOneAndUpdate({ _id }, { $set: { safeDeleted: true } })
	}
	public async restoreDetail(_id: ObjectId): Promise<void> {
		await this.contentDB()
		await modelDetail.findOneAndUpdate({ _id }, { $set: { safeDeleted: false } })
	}
	public async searchDetail(reg: RegExp, idOrder?: ObjectId): Promise<TDetail[] | null> {
		await this.contentDB()
		return modelDetail.find({
			$and: [
				{
					$or: [
						{ nameDetail: reg },
						{ description: reg },
						{ propertyDetail: { $elementMatch: { reg } } },
					],
				},
				{ idOrder },
			],
		})
	}
	public async updateDataForDetail(_id:ObjectId,data:TDetail):Promise<void> {
		await this.contentDB()
		await modelDetail.findOneAndUpdate({_id},{data})
	}
}
