import { useState, useMemo, memo } from "react";
import DatePicker from "tailwind-datepicker-react";
import { IOptions } from "tailwind-datepicker-react/types/Options";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { TDBUser } from "@/Types/Types";
import { FormikErrors } from "formik";

// import {options} from './option'

const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1940-01-01"),
  theme: {
    background: " bg-menu-color dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <GrPrevious />,
    next: () => <GrNext />,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2022-01-01"),
  language: "ru",
  disabledDates: [],
  weekDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Выберите дату",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
} as IOptions;

type TInputDate = {
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

export default function InputDate({
  title = "Дата",
  name = "date",
  currentDate = "2022-01-01",
  setFieldValue,
}: TInputDate) {
  const [show, setShow] = useState(false);

  const handleClose = (state: boolean) => {
    setShow(state);
  };
  if(setFieldValue){
    return (
      <div>
        <DatePicker
          options={{
            ...options,
            title,
            inputNameProp: name,
            defaultDate: new Date(currentDate),
          }}
          onChange={(val) => {
            setFieldValue && setFieldValue(name, val);
          }}
          show={show}
          setShow={handleClose}
        />
      </div>
    );
  }
  else{
    const dateBirthday = new Date(currentDate)
    return <div>
      <span>{dateBirthday.getFullYear()}</span>
      <span>{}</span>
    </div>
  }

 
}
