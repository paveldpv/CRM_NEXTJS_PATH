import { TFieldData } from "@/Types/Types";


// const t :TFieldData[]=[{ name: "email", title: "email", placeholder: "эл.почта*", type: "email" }]


export const fieldDataPrevCalc: TFieldData[] = [
  { name: "email", title: "email", placeholder: "эл.почта*", type: "email" },
  { name: "phone", title: "phone", placeholder: "номер тел.*", type: "phone" },
  { name: "name", title: "name", placeholder: "Имя", type: "text" },
  { name: "surName", title: "surName", placeholder: "Фамилия", type: "text" },
  {
    name: "description",
    title: "description",
    multiline: true,
    placeholder: "Описание",
    type: "text",
  },
  { name: "INN", title: "INN", placeholder: "ИНН(если есть)", type: "text" },
];
