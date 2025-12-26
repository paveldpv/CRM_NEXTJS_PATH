import { IOptions } from 'tailwind-datepicker-react/types/Options'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

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

export default options