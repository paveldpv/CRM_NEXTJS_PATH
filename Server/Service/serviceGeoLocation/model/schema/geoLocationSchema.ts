
import { Schema } from 'mongoose'
import { TGeoLocation } from '../types/type'

export const geoLocationSchema = new Schema<TGeoLocation>({
	location: {
		latitude: {
			type: String,
			required: false,
			default: 'NOT_GEO',
		},
		longitude: {
			type: String,
			required: false,
			default: 'NOT_GEO',
		},
	},
	date: {
		type: Date,
		required: true,
	},
	descriptionProcess: {
		type: String,
		required: false,
	},
	process: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'user',
	},
	ip: {
		type: String,
		required: false,
		default: 'не отслеживалось',
	},
	safeDeleted:{
		type:Boolean,
		required:true,
		default:false
	}
})

// const modelGeoLocation =
// 	(models.geoLocationSchema as Model<TGeoLocation>) || model<TGeoLocation>('geoLocationSchema', geoLocationSchema)

// export default modelGeoLocation
