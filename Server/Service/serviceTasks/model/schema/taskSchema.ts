import { Model, Schema, model, models } from 'mongoose'
import { TServiceTask, TTask } from '../types/Types'


const schemaServiceTask = new Schema<TServiceTask>(
	{
		dateCreateTask: {
			type: Date,
			required: true,
			default: new Date(),
		},
		dateEndRedactTask: {
			type: Date,
			required: false,
		},
		dateEndTask: {
			type: Date,
			requiredL: false,
		},
		dateExecution: {
			required: false,
			type: {
				startDate: Date,
				endDate: Date,
				dateDeadLine: Date,
			},
		},
	},
	{ _id: false }
)

const taskSchema = new Schema<TTask>({
	idDetail: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'detailSchema',
	},
	idAssignEmployees: [
		{
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: false,
		},
	],
	service: {
		required: false,
		type: schemaServiceTask,
	},
	salary: {
		type: [
			{
				payment: String,
				idEmployee: [Schema.Types.ObjectId],
			},
		],
		required: false,
	},
	safeDeleted: {
		type: Boolean,
		required: true,
		default: false,
	},
})

const modelTask = (models.task as Model<TTask>) || model<TTask>('task', taskSchema)

export default modelTask
