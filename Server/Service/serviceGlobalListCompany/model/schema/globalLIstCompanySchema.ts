import { Model, model, models, Schema } from 'mongoose'
import { TGlobalListCompany } from '../types/Type'

const globalCompanySchema = new Schema<TGlobalListCompany>({
	INN: {
		type: String,
		required: true,
	},
	name: {
		fullName: {
			type: String,
			required: false,
		},
		abbreviated: {
			type: String,
			required: false,
		},
	},
	globalVisible: {
		type: Boolean,
		required: true,
		default: true,
	},
	description: {
		type: [String],
		default: [],
		required: false,
	},
})

const modelGlobalCompany =
	(models.globalCompanySchema as Model<TGlobalListCompany>) ||
	model<TGlobalListCompany>('globalCompanySchema', globalCompanySchema)
export default modelGlobalCompany
