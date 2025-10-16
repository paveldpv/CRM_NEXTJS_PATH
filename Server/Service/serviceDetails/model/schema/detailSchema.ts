import { Schema } from 'mongoose'
import { TDetail } from '../types/Types'

export const detailSchema = new Schema<TDetail>({
	order: {
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
		required: false,
		type: Schema.Types.Mixed,
		default: [],
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
	amount: {
		type: Number,
		default: 1,
	},
})

// const modelDetail =
// 	(models.detailSchema as Model<TDetail>) || model<TDetail>('detailSchema', detailSchema)
// export default modelDetail
