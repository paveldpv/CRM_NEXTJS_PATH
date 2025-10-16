import { Model, Schema, model, models } from 'mongoose'
import { TPropertyDetail } from '../types/Types'


export const propertyDetailSchema = new Schema<TPropertyDetail>({
	property: {
		type: String,
		required: false,
		
	},
	safeDeleted:{
		type:Boolean,
		default:false
	}
})

