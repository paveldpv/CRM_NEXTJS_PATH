import { ObjectId } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import modelDetail from '../model/schema/detailSchema'
import { TDetail, TNewDetail } from '../model/types/Types'
import { TResponseUploadFiles } from '@/shared/model/types/Types'

export class ControllerDetail extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	public async addDetailForOrder(newDetail: TNewDetail): Promise<void> {
		await this.contentDB()
		const _newDetail = new modelDetail(newDetail)
		await _newDetail.save()
	}
	public async removeDetailFromOrder(idDetail: ObjectId): Promise<void> {
		await this.contentDB()
		await modelDetail.findOneAndUpdate({ _id:idDetail }, { $set: { safeDeleted: true } })
	}
	public async getDetailFromOrderWithDeleted(idOrder:ObjectId):Promise<null|TDetail[]|[]>{
		await this.contentDB()
		return modelDetail.find({idOrder})
	}
	public async restoreDetail(idDetail: ObjectId): Promise<void> {
		await this.contentDB()
		await modelDetail.findOneAndUpdate({ _id:idDetail }, { $set: { safeDeleted: false } })
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
	public async updateDataForDetail(idDetail:ObjectId,data:TDetail):Promise<void> {
		await this.contentDB()
		await modelDetail.findOneAndUpdate({_id:idDetail},{data})
	}

	public async addFilesFromDetail(idDetail:ObjectId,files:TResponseUploadFiles[]):Promise<void>{
		await this.contentDB()
		await modelDetail.findOneAndUpdate({_id:idDetail},{$push:{files:{$each:files}}})
	}
	public async removeFileFromDetail(idDetail:ObjectId,FullPath:string):Promise<void>{
		await this.contentDB()
		await modelDetail.findOneAndUpdate({_id:idDetail},{$pull:{'files.FullPath':FullPath}})
	}
}
