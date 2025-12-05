import { Model, Schema, model, models } from 'mongoose'
import { TDelivered, TOrder, TPaymentOrder, TServiceOrder } from '../types/Types'

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

const payment = new Schema<TPaymentOrder>({
	type:{
		type:String,
		required:false
	},
	price:{
		type:Number,
		required:false,
		
	},
	paymentStatus:{
		type:Boolean,
		required:true,
		default:false
	},
	payment:{
		type:Number,
		required:true,
		default:0
	}
})

export const orderSchema = new Schema<TOrder>({
	processCompleted:{
		type:Number,
		default:0,
		required:false
	},
	CounterParty: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'counterparty',
	},
	numberOrder: {
		type: Number,
		required: true,
	},
	acceptedOfCargoEmployeeId:{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'user',
	},
	details: {
		type: [Schema.Types.ObjectId],
		required: false,
		default: [],
		ref: 'detail',
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
	payment:payment
})

// const modelOrder = (models.order as Model<TOrder>) || model<TOrder>('order', orderSchema)
// export default modelOrder
