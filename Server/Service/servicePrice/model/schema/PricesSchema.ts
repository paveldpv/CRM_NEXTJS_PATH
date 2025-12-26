
import { Schema } from 'mongoose'
import { TDataTablePrice } from '../types/types'

export const pricesSchema = new Schema<TDataTablePrice>({
	nameTable: {
		type: String,
		default: 'прайс',
	},
	safeDeleted:{type:Boolean,required:true,default:false},
	optionDescriptionTable: {
		type: [String],
		required: false,
	},
	data: Schema.Types.Mixed, //[[]]
})

// const modelPrices = (models.price as Model<TDataTablePrice>) || model<TDataTablePrice>('price', pricesSchema)
// export default modelPrices
