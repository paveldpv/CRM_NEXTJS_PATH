import { TRequisites } from '@/shared/model/types/subtypes/TRequisites'
import { connect } from 'mongoose'
import ControllerDB from '../../../classes/ControllerDB'
// import ContextOrganization from '../../classes/contextOrganization'
 import modelRequisites from '../model/schema/RequisitesSchema'

export default class ControllerDBRequisites extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	public async addNewRequisites(dataNewRequisites: Partial<TRequisites>) {
		await this.contentDB()
		const newRequisites = new modelRequisites(dataNewRequisites)
		await newRequisites.save()
	}

	public async updateRequisites(data: Partial<TRequisites>) {
		await this.contentDB()
		await modelRequisites.updateOne({ INN: data.INN }, data)
	}

	public async deleteRequisites(INN: string) {
		await this.contentDB()
		await modelRequisites.updateOne(
			{ INN: INN },
			{
				$set: {
					safeDeleted: true,
				},
			}
		)
	}

	public async getRequisiteByParams(params: TRequisites): Promise<TRequisites | null> {
		await this.contentDB()
		return await modelRequisites.findOne(params, { safeDeleted: false })
	}

	public async getAllRequisites(): Promise<TRequisites[]> {
		await this.contentDB()
		return await modelRequisites.find({})
	}

	public async getRequisitesCurrentOrganization(): Promise<TRequisites> {
		await this.contentDB()

		return (await modelRequisites.findOne({ 'INN.value': this.INN }, { _id: 0, __v: 0 }).exec()) as TRequisites
	}
}
