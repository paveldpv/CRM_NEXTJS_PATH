import * as Yup from 'yup'

export const validationSchemaOrder = Yup.object().shape({
	CounterParty: Yup.object().required('Выберите контрагента'),
	service: Yup.object().shape({
		deadlines: Yup.object().shape({
			startDate: Yup.date().required('Дата начала обязательна'),
			endDate: Yup.date().nullable(),
		}),
		delivered: Yup.object()
			.shape({
				dateDelivered: Yup.date().nullable(),
				car: Yup.object().shape({
					number: Yup.string().max(7, 'Максимум 7 символов'),
					driver: Yup.object().shape({
						name: Yup.string(),
						lastName: Yup.string(),
						surName: Yup.string(),
						phone: Yup.string(),
						otherData: Yup.string(),
					}),
				}),
			})
			.nullable(),
	}),
	payment: Yup.object()
		.shape({
			type: Yup.string().oneOf(['CASH', 'NO_VAT', 'VAT']),
			price: Yup.number().min(0, 'Цена не может быть отрицательной'),
			paymentStatus: Yup.boolean(),
			payment: Yup.number().min(0, 'Оплата не может быть отрицательной'),
		})
		.nullable(),
	optionsDescription: Yup.array().of(Yup.string()),
})
