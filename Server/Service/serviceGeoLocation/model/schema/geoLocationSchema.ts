import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { Model, Schema, model, models } from 'mongoose'

export const geoLocationSchema = new Schema<TGeoLocation>({
	location: {
		latitude: {
			type: String,
			required: false,
			default:'NOT_GEO'
		},
		longitude: {
			type: String,
			required: false,
			default:"NOT_GEO"
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
	idEmployee: {
		type: String,
		required: true,
	},
	ip: {
		type: String,
		required: false,
		default: 'не отслеживалось',
	},
})

const modelGeoLocation =
	(models.geoLocationSchema as Model<TGeoLocation>) || model<TGeoLocation>('geoLocationSchema', geoLocationSchema)

export default modelGeoLocation
