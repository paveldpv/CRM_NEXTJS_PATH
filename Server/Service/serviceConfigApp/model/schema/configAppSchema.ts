import { Schema } from 'mongoose'
import { TConfigAPP } from '../types/Type'

export const configSchema = new Schema<TConfigAPP>({
	idUser: {
		type: Schema.Types.ObjectId,
		required: true,
		// ref: 'users',
	},
	configHeader: {
		color: {
			bgColor: String,
			textColor: String,
			borderColor: String,
		},
		textSize: String,
		font: String,
		name: String,
		keyConfig: String,
	},
	configMain: {
		color: {
			bgColor: String,
			textColor: String,
			borderColor: String,
		},
		textSize: String,
		font: String,
		name: String,
		keyConfig: String,
	},
	configNavMenu: {
		color: {
			bgColor: String,
			textColor: String,
			borderColor: String,
		},
		textSize: String,
		font: String,
		name: String,
		keyConfig: String,
	},
	safeDeleted:{
		type:Boolean,required:true,default:false
	}
})
// const modelConfig = (models.configSchema as Model<TConfigAPP>) || model<TConfigAPP>('configSchema', configSchema)
// export default modelConfig
