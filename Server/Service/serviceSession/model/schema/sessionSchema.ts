import mongoose, { model, Model, models, Schema } from 'mongoose'
import { TSession } from '../types/Type'

export const sessionSchema = new Schema<TSession>({
	
	idUser: {
		type: mongoose.Types.ObjectId,
		required: true,
		index:{unique:true}
	},
	
	refreshToken: {
		type: String,
		required: true,
		index: { unique: true },
	},
	online:{
		type:Boolean,
		required:true,
		default:true
	},
	lastAction:{
		type:Date,
		required:true,

	}
},{_id:false})

const modelSession =
	(models.sessionSchema as Model<TSession>) || model<TSession>('sessionSchema', sessionSchema)


	export default modelSession