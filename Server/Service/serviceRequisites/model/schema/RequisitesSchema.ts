import { TRequisites } from '@/shared/model/types/subtypes/TRequisites'
import { Model, model, models, Schema } from 'mongoose'

export const requisitesSchema = new Schema<TRequisites>({
	INN: {
		type: {
			title: String,
			value: Number,
		},
		required: false,
	},
	KPP: {
		type: {
			title: String,
			value: Number,
		},
		required: false,
	},
	legalAddress: {
		type: {
			title: String,
			value: String,
		},
		required: false,
	},
	mailAddress: {
		type: {
			title: String,
			value: String,
		},
		required: false,
	},
	phone: {
		type: {
			title: String,
			value: String,
		},
		required: false,
	},
	nameDirector: {
		type: {
			title: String,
			value: String,
		},
		required: false,
	},
	email: {
		type: {
			title: String,
			value: String,
		},
		required: false,
	},
	OGRN: {
		type: {
			title: String,
			value: Number,
		},
		required: false,
	},
	OKVD: {
		type: {
			title: String,
			value: Schema.Types.Mixed,
		},
		required: false,
	},
	requisitesBank: {
		checkingAccount: {
			type: {
				title: String,
				value: String,
			},

			required: false,
		},
		nameBank: {
			required: false,
			type: {
				title: String,
				value: String,
			},
		},
		korAccount: {
			required: false,
			type: {
				title: String,
				value: String,
			},
		},
		BIK: {
			required: false,
			type: {
				title: String,
				value: String,
			},
		},
	},
	srcRequisites: {
		type: Schema.Types.Mixed,
		default: 'NOT_FOUND',
	},
	safeDeleted: {
		type: Boolean,
		required: true,
		default: false,
	},
})

const modelRequisites =
	(models.requisitesSchema as Model<TRequisites>) || model<TRequisites>('requisitesSchema', requisitesSchema)

export default modelRequisites
