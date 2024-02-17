import { TFormLogin } from "@/Types/Types";
import * as Yup from 'yup'

const LoginSchemaForm = Yup.object().shape({
   password: Yup.string()
   .required("обязательное поле")
   .min(8, "пароль должен содержать миниму 8 символов")
   .matches(/[a-zA-Z]/, "пароль должен содержать заглавную и строчную букву латинского языка"),
   phone: Yup.string().required("обязательное поле"),
   INN:Yup.string().required(`обязательное поле`),
})
export default LoginSchemaForm