import { TFieldFormAdminPanel } from "./FormAdminPanel";
import { Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FaTelegram, FaCopy } from "react-icons/fa6";

import { styleTextFiled } from "../../../../config/muiCustomStyle/textField";

import React from "react";
import { useDialogWindow } from "../../../../store/storeDialogWindow";
import { typeDialog } from "@/Types/enums";

export type TChangeOptionData = { INN: string } & TFieldFormAdminPanel;

/**
 * update,viewing and redaction data:
 *
 * - settings telegram
 *
 * - settings email
 *
 * - href prev calc page
 */

export default function ChangeOptionData({ activeField, defaultData, handlerChange, INN }: TChangeOptionData) {
  const { telegram, paramsEmailNewsletter, ...otherOption } = defaultData;
  const [setOpenDialogWindow]=useDialogWindow(state=>[state.setOpen])
  
  const copyHref = async(e:React.MouseEvent)=>{
    e.preventDefault()
    const host = window.location.host

    const hrefPrevCalc = `${host}/${INN}/prevCalc`
    try {
      
      const resCopy = await navigator.clipboard.writeText(hrefPrevCalc)
      setOpenDialogWindow(true,{title:'скопировано'})
    } catch (error) {
      setOpenDialogWindow(true,{title:'ошибка',message:'непредвидимая ошибка ,попробуйте позже'},typeDialog.error)
      console.log(`error clip board ,error${error}`);
      
    }

  }

  return (
    <fieldset className="border-2 border-solid border-menu_color p-3 text-xs  rounded-xs  rounded-md col-span-1">
      <legend className=" pr-1 pl-1">Доп.параметры</legend>
      <div className="flex flex-col gap-2">
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
        <hr className=" h-1 bg-menu_color" />
        <div className="grid grid-cols-4 gap-3">
          <a
            href={`/${INN}/prevCalc`}
            target="_blank"
            className="  col-span-3 text-center text-md text-menu_color style_border p-2   hover:text-color_header  hover:border-color_header duration-75"
          >
            страница предварительного расчета
          </a>
          <Tooltip title="скопировать">
            <button onClick={copyHref}
             className=" flex justify-center items-center text-2xl text-menu_color p-2 style_border  hover:text-color_header  hover:border-color_header duration-75 ">
              <FaCopy />
            </button>
          </Tooltip>
        </div>
      </div>
    </fieldset>
  );
}
