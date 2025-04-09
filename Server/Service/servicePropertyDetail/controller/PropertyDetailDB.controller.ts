import ControllerDB from '../../../classes/ControllerDB'
import modelPropertyDetail from '../model/schema/propertyDetailSchema'

export default class ControllerPropertyDetail extends ControllerDB {
	constructor(INN: string) {
		super(INN)
	}

	public async searchProperty(dataSearch: RegExp) {
		this.contentDB()
		return await modelPropertyDetail.find({ property: dataSearch })
	}

	public async addNewProperty(property: string) {
		this.contentDB()
		const newProperty = new modelPropertyDetail({ property })
		await newProperty.save()
	}

	public async removeProperty(idProperty: string) {
		this.contentDB()
		await modelPropertyDetail.findOneAndDelete({ _id: idProperty })
	}

	public async getProperty() {
		this.contentDB()
		return await modelPropertyDetail.find({})
	}
}
