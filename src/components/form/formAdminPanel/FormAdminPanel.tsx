"use client";
import { useFormik } from "formik";
import InputFile from "@/components/UI/InputElements/InputFiles/InputFile";
import InputPicture from "@/components/UI/InputElements/InputPicture/InputPicture";
import { TDataOrganization } from "@/Types/Types";

export type TFormAdminPanel = {
  INN: number;
  data?: TDataOrganization;
};

export default function FormAdminPanel({ INN, data }: TFormAdminPanel) {
  console.log(data);

  return (
    <fieldset className="border-2 border-solid border-menu_color p-2 text-2xl  rounded-xs ">
      <legend className="pr-1 pl-1  rounded-sm font-bold  bg-menu_color text-list_menu_even ml rounded-xs">
        Настройка Организации
      </legend>
      <form className="w-full h-full">
        {/* <InputPicture/>
        <InputPicture/>
        <InputFile/> */}
      </form>
    </fieldset>
  );
}
