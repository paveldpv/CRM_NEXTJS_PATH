import * as Yup from "yup";

const validateSchemaPrevCalc = Yup.object().shape({
   email: Yup.string().email('введите корректный эл.Адрес').required("обязательное поле"),
   phone: Yup.string().matches(/^\d+$/,'только цифры').max(12,'номер из 12 символов').min(6,'мин.6 цифр').required("обязательное поле"),
})

export default validateSchemaPrevCalc