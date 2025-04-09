import { Model, Schema, model, models } from 'mongoose'
import { TPropertyDetail } from '../types/Types'


export const propertyDetailSchema = new Schema<TPropertyDetail>({
	property: {
		type: String,
		required: false,
	},
})

const modelPropertyDetail =
	(models.propertydetail as Model<TPropertyDetail>) ||
	model<TPropertyDetail>('propertydetail', propertyDetailSchema)

export default modelPropertyDetail
