import { TDataTablePrice } from '@/entities/price/model/Types'
import { model, Model, models, Schema } from 'mongoose'

export const pricesSchema = new Schema<TDataTablePrice>({
	nameTable: {
		type: String,
		default: 'прайс',
	},
	idTable: { type: String, required: true },
	optionDescriptionTable: {
		type: [String],
		required: false,
	},
	data: Schema.Types.Mixed, //[[]]
})

const modelPrices = (models.price as Model<TDataTablePrice>) || model<TDataTablePrice>('price', pricesSchema)
export default modelPrices
