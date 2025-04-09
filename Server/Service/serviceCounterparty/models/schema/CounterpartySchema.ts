import { Model, Schema, model, models } from 'mongoose'
import { TCounterparty } from '../types/Types'


export const counterpartySchema = new Schema<TCounterparty>({
	phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: false,
	},
	dateCreate: Date,
	name: {
		type: String,
		required: false,
	},
	data: {
		type: [
			{
				description: String,
			},
		],
		default: [],
	},
	srcRequisites: {
		type: Schema.Types.Mixed,
		default: 'NOT_FOUND',
	},
	safeDeleted: {
		type: Boolean,
		default: false,
		required: true,
	},
})
const modelCounterparty =
	(models.counterparty as Model<TCounterparty>) ||
	model<TCounterparty>('counterparty', counterpartySchema)

export default modelCounterparty
