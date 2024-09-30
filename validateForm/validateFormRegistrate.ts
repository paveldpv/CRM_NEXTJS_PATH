import { TFormRegistrate } from "@/Types/Types";
import * as Yup from "yup";

const SignupSchemaFormRegistrate = Yup.object().shape({
 INN:Yup.string().required(`обязательное поле`),
email: Yup.string().min(5,'минимум 5 символов').email("не корректный адрес эд почты").required("обязательное поле"),
password: Yup.string()
  .required("обязательное поле")
  .min(8, "пароль должен содержать минимум 8 символов")
  .matches(/[a-zA-Z]/, "пароль должен содержать заглавную и строчную букву латинского языка"),
phone: Yup.string().required("обязательное поле"),


});
export default SignupSchemaFormRegistrate;
