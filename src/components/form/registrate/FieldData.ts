import { TFieldData } from "@/Types/Types";

export const fieldData: TFieldData[] = [
  {name:'email', title: "email", placeholder: "эл.почта*", type: "email" },
  {name:'phone', title: "phone", placeholder: "номер тел.*", type: "phone" },
  {name:'password', title: "password", placeholder: "пароль*", type: "password" },
  // { title: "nameOrganization", placeholder: "Название организации*", type: "text" },
  {name:'INN' ,title: "INN", placeholder: "ИНН*", type: "number" },
];
