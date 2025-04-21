import { ControllerDBGlobalList } from '../../../classes/ControllerDBGlobalList'
import modelGlobalCompany from '../model/schema/globalLIstCompanySchema'
import { TGlobalListCompany, TGlobalListCompanyWithoutID } from '../model/types/Type'

export default class ControllerGlobalListCompany extends ControllerDBGlobalList {
	public async getListCompany(
		range = 5,
		searchParams?: RegExp
	): Promise<TGlobalListCompany[] | [] | null> {
		await this.connectDBGlobaList()
		return await modelGlobalCompany
			.find({
				$or: [
					{ 'name.fullName': searchParams },
					{ 'name.abbreviated': searchParams },
					{ INN: searchParams },
					{ description: { $elemMatch: { searchParams } } },
				],
			})
			.skip(range - 5)
			.limit(5)
	}
	public async addNewCompany(data: TGlobalListCompanyWithoutID) {
		await this.connectDBGlobaList()
		const newCompany = new modelGlobalCompany(data)
		await newCompany.save()
	}
	public async setVisible(INN: string, visible: boolean) {
		await this.connectDBGlobaList()
		await modelGlobalCompany.findOneAndUpdate({ INN }, { $set: { globalVisible: visible } })
	}

	public async updateDescription(INN: string, description: string[]) {
		await this.connectDBGlobaList()
		await modelGlobalCompany.findOneAndUpdate({ INN }, { $set: { description: description } })
	}
}
