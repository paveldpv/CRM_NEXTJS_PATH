import * as Yup from 'yup'

const NewEmployeeSchemaForm = Yup.object().shape({
	
	phone: Yup.string()
		.matches(/^[0-9]*$/, 'только цифры в формате 89*******')
		.min(11, 'слишком короткий номер')
		.required('обязательное поле'),
	
})
export default NewEmployeeSchemaForm
