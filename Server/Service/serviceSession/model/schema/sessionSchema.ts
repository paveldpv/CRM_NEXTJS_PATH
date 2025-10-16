import { Schema } from 'mongoose'
import { TSession } from '../types/Type'

export const sessionSchema = new Schema<TSession>(
	{
		user: { 
			type: Schema.Types.ObjectId,
			required: true,
			index: { unique: true },
			ref:'user'
		},

		refreshToken: {
			type: String,
			required: true,
			index: { unique: true },
		},
		online: {
			type: Boolean,
			required: true,
			default: true,
		},
		lastAction: {
			type: Date,
			required: true,
		},
		safeDeleted:{
			default:false,
			required:true
		}
	}
	
)
