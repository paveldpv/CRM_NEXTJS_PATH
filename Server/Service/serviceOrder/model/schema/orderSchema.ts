import { Model, Schema, model, models } from 'mongoose'
import { TDelivered, TOrder, TServiceOrder } from '../types/Types'

const deliveredSchema = new Schema<TDelivered>({
	dateDelivered: {
		type: Date,
		required: true,
	},
	car: {
		type: {
			driver: {
				name: {
					type: String,
					required: false,
				},
				lastName: {
					type: String,
					required: false,
				},
				surName: {
					type: String,
					required: false,
				},
				phone: {
					type: String,
					required: false,
				},
			},
			number: String,
		},
		required: false,
	},
})

const serviceOptionOrder = new Schema<TServiceOrder>({
	acceptedOfCargoEmployeeId: {
		type: String,
		required: true,
	},
	deadlines: {
		type: {
			startDate: {
				type: Date,
				required: true,
			},
			endDate: {
				type: Date,
				required: false,
			},
		},
	},
	delivered: {
		required: false,
		type: deliveredSchema,
	},
})

const orderSchema = new Schema<TOrder>({
	idCounterParty: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'counterparty',
	},
	numberOrder: {
		type: Number,
		required: true,
	},
	IDDetails: {
		type: [Schema.Types.ObjectId],
		required: false,
		default: [],
		ref: 'detailSchema',
	},
	complied: {
		type: Boolean,
		default: false,
	},
	safeDeleted: {
		type: Boolean,
		default: false,
	},
	service: serviceOptionOrder,
	optionsDescription: {
		type: [String],
		required: false,
	},
})

const modelOrder = (models.order as Model<TOrder>) || model<TOrder>('order', orderSchema)
export default modelOrder
