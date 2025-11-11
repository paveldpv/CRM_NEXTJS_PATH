import { TResponseUploadFiles } from '@/shared/model/types/subtypes/Types'
import { Model, Types } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
import { detailSchema } from '../model/schema/detailSchema'
import { TDetail, TFullInfoTDetail, TNewDetail, TNewStep } from '../model/types/Types'

export class ControllerDetail extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}
	private detailModel: Model<TDetail> | null = null

	private async initModel() {
		await this.connectDB()
		if (!this.dbConnection) throw new Error(`error init model detail from INN ${this.INN}`)

		this.detailModel = this.dbConnection.model<TDetail>('detail', detailSchema)
	}

	private async changeReadinessModel() {
		if (!this.detailModel) await this.initModel()
	}

	public async addDetailForOrder(newDetail: TNewDetail): Promise<void> {
		await this.changeReadinessModel()
		const _newDetail = new this.detailModel!(newDetail)
		await _newDetail.save()
	}
	public async removeDetailFromOrder(idDetail: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.detailModel!.findOneAndUpdate({ _id: idDetail }, { $set: { safeDeleted: true } })
	}
	public async getDetailFromOrderWithDeleted(idOrder: Types.ObjectId): Promise<null | TDetail[] | []> {
		await this.changeReadinessModel()
		return this.detailModel!.find({ idOrder }, { safeDeleted: true })
	}

	public async getDetailByIdOrder(idOrder: Types.ObjectId): Promise<null | TDetail[] | []> {
		await this.changeReadinessModel()
		return this.detailModel!.find({ idOrder }, { safeDeleted: false })
	}
	public async restoreDetail(idDetail: Types.ObjectId): Promise<void> {
		await this.changeReadinessModel()
		await this.detailModel!.findOneAndUpdate({ _id: idDetail }, { $set: { safeDeleted: false } })
	}
	public async searchDetail(reg: RegExp): Promise<TFullInfoTDetail[] | null> {
		await this.changeReadinessModel()
		return this.detailModel!.find({
			$and: [
				{
					$or: [{ nameDetail: reg }, { description: reg }, { propertyDetail: { $elementMatch: { reg } } }],
				},
			],
		}).populate({
			path: 'order',
			populate: {
				path: 'counterparty',
			},
		})
	}
	public async updateDataForDetail(idDetail: Types.ObjectId, data: TDetail): Promise<void> {
		await this.changeReadinessModel()
		await this.detailModel!.findOneAndUpdate({ _id: idDetail }, { data })
	}

	public async addFilesFromDetail(idDetail: Types.ObjectId, files: TResponseUploadFiles[]): Promise<void> {
		await this.changeReadinessModel()
		await this.detailModel!.findOneAndUpdate({ _id: idDetail }, { $push: { files: { $each: files } } })
	}
	public async removeFileFromDetail(idDetail: Types.ObjectId, FullPath: string): Promise<void> {
		await this.changeReadinessModel()
		await this.detailModel!.findOneAndUpdate({ _id: idDetail }, { $pull: { 'files.FullPath': FullPath } })
	}
	public async addNewStepDetail(idDetail: Types.ObjectId, step: TNewStep) {
		await this.changeReadinessModel()
		await this.detailModel!.findOneAndUpdate({ _id: idDetail }, { $push: { step: step } })
	}

	public async nextStepDetail(idDetail: Types.ObjectId, employeeId: Types.ObjectId, stepName: string) {
		await this.changeReadinessModel()
		await this.detailModel!.findOneAndUpdate(
			{
				_id: idDetail,
				'step.name': stepName,
				'step.completed': false,
			},
			{
				$set: {
					'step.$.completed': true,
					'step.$.employeeId': employeeId,
					'step.$.dateCompleted': new Date(),
				},
			}
		)
	}
	public async completedDetail(idDetail: Types.ObjectId) {
		await this.changeReadinessModel()
		await this.detailModel!.findOneAndUpdate({ _id: idDetail }, { $set: { completed: true } })
	}
}
