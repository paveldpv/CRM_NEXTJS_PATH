import { TFieldFormAdminPanel } from "./FormAdminPanel";

import TextField from "@mui/material/TextField";
import { FaTelegram } from "react-icons/fa6";

import { styleTextFiled } from "../../../../config/muiCustomStyle/textField";

export type TChangeOptionData = {} & TFieldFormAdminPanel;

export default function ChangeOptionData({ activeField, defaultData, handlerChange }: TChangeOptionData) {
  //telegram
  //params email letter
  const { telegram, paramsEmailNewsletter, ...otherOption } = defaultData;

  return (
    <fieldset className="border-2 border-solid border-menu_color p-3 text-xs  rounded-xs  rounded-md col-span-1">
      <legend className=" pr-1 pl-1">Доп.параметры</legend>
      <div className="flex flex-col gap-1">
        <TextField disabled placeholder="id телеграм бота" {...styleTextFiled} />
        {activeField && telegram?.hrefChat !== "не задан" ? (
          <a href={telegram?.hrefChat} target="_blank" className=" text-2xl">
            <FaTelegram />
          </a>
        ) : (
          <TextField
            {...styleTextFiled}
            defaultValue={telegram?.hrefChat}
            disabled={activeField}
            name="telegram.hrefChat"
            onChange={handlerChange}
            placeholder="ссылка на профиль телеграмма"
            label="ссылка на профиль телеграмма"
          />
        )}
        <hr className=" h-1 bg-menu_color" />
        <TextField
          {...styleTextFiled}
          className=" "
          defaultValue={paramsEmailNewsletter?.email}
          disabled={activeField}
          name="paramsEmailNewsletter.email"
          onChange={handlerChange}
          placeholder="почта для отправки писем"
          label="почта для отправки писем"
        />
        <TextField
          {...styleTextFiled}
          defaultValue={paramsEmailNewsletter?.password}
          disabled={activeField}
          name="paramsEmailNewsletter.password"
          onChange={handlerChange}
          placeholder="пароль от почты"
          label="пароль от почты"
        />
      </div>
    </fieldset>
  );
}
