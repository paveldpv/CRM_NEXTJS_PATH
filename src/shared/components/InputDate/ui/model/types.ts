import { TDBUser } from '@/shared/model/types/Types'
import { FormikErrors } from "formik";
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