import { Schema } from 'mongoose'
import { TDetail, TPropertyStep } from '../types/Types'

const PropertyStepSchema = new Schema<TPropertyStep>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		employeeId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'user',
		},
		createBy: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
		dateCompleted: {
			type: Date,
			default: null,
			required: false,
		},
		dateCreateStep: {
			type: Date,
			default: new Date(),
			required: false,
		},
	},
	{
		_id: false, // если не нужны отдельные id для каждого шага
		timestamps: false,
	}
)

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
	completed: {
		type: Boolean,
		required: false,
		default: false,
	},
	step: {
		type: [PropertyStepSchema],
		default: [],
	},
})

// const modelDetail =
// 	(models.detailSchema as Model<TDetail>) || model<TDetail>('detailSchema', detailSchema)
// export default modelDetail
