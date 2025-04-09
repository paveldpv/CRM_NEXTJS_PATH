import { Model, Schema, model, models } from 'mongoose'
import { TDetail } from '../types/Types'

const detailSchema = new Schema<TDetail>({
	idOrder: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'order',
	},
	nameDetail: {
		type: String,
		required: true,
	},
	safeDeleted: {
		type: Boolean,
		default: false,
	},
	dateAddDetail: {
		type: Date,
		required: false,
	},
	description: {
		type: [String],
		required: false,
	},
	files: {
		type: Schema.Types.Mixed,
		default: 'NOT_FOUND',
	},
	price: {
		required: false,
		type: { price: String },
	},
	propertyDetail: {
		type: [String],
		required: false,
	},
	sketch: {
		type: Schema.Types.Mixed,
		required: false,
	},
})

const modelDetail =
	(models.detailSchema as Model<TDetail>) || model<TDetail>('detailSchema', detailSchema)
export default modelDetail
