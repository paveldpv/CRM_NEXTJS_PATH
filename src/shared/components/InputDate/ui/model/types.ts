
import { FormikErrors } from "formik";
import { TDBUser } from '../../../../../../Server/Service/serviceUser/model/types/Types'
export type TInputDate = {
  handlerChange?: any;
  title?: string;
  name?: string;
  currentDate?: string;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<TDBUser>>;
};