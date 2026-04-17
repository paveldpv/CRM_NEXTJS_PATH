import { Schema } from 'mongoose'
import { TDetail, TPropertyStep } from '../types/Types'




const PropertyStepSchema = new Schema<TPropertyStep>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        employeeId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        createBy: { 
            type: Schema.Types.ObjectId, 
            required: true, 
            ref: 'user' 
        },
        dateCompleted: {
            type: Date,
            default: null,
            required: false,
        },
        dateCreateStep: {
            type: Date,
            default: () => new Date(),
            required: false,
        },
    },
    {
        _id: false,
        timestamps: false,
    }
)


export const detailSchema = new Schema<TDetail>(
    {
        // ==========================================
        // ДИСКРИМИНАТОР - ГЛАВНОЕ ПОЛЕ
        // ==========================================
        entitiesType: {
            type: String,
            enum: ['DETAIL', 'ASSEMBLY'],
            required: true,
            default: 'DETAIL',
        },

        // ==========================================
        // ОБЩИЕ ПОЛЯ ДЛЯ ОБОИХ ТИПОВ
        // ==========================================
        order: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'order',
        },
        nameDetail: {
            type: String,
            required: true,
        },
        dateAddDetail: {
            type: Date,
            required: false,
            default: () => new Date(),
        },
        completed: {
            type: Boolean,
            required: false,
            default: false,
        },
        amount: {
            type: Number,
            default: 1,
        },
        completedAmount: {
            type: Number,
            default: 0,
        },
        description: {
            type: [String],
            required: false,
        },
        files: {
            required: false,
            type: Schema.Types.Mixed,
            default: [],
        },
        price: {
            required: false,
            type: { price: Number },  
        },
        propertyDetail: {
            type: [String],
            required: false,
        },
        sketch: {
            type: Schema.Types.Mixed,
            required: false,
        },
        step: {
            type: [PropertyStepSchema],
            default: [],
        },

        // ==========================================
        // ПОЛЕ ТОЛЬКО ДЛЯ ASSEMBLY
        // ==========================================
        components: {
            type: [Schema.Types.ObjectId],
            ref: 'detail',  // Ссылается на саму себя!
            required: function(this: any) {
                // Обязательно только для ASSEMBLY
                return this.entitiesType === 'ASSEMBLY'
            },
            default: undefined,
        },

        // ==========================================
        // СИСТЕМНЫЕ ПОЛЯ
        // ==========================================
        safeDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,  
    }
)

detailSchema.index({ entitiesType: 1 })
detailSchema.index({ order: 1 })
detailSchema.index({ components: 1 })  
detailSchema.index({ safeDeleted: 1 })