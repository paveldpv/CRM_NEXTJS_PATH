"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { TDBUser } from "@/Types/Types";
import { useFormik } from "formik";
import InputFile from "@/components/UI/InputElements/InputFiles/InputFile";
import InputPicture from "@/components/UI/InputElements/InputPicture/InputPicture";
import HelpInformerModalWindow from "@/components/additional/HelpInformerModalWindow";
import { useDataUser } from "../../../../store/storeConfigApp";
import { TDataHelpInformer, useHelInformer } from "../../../../store/storeHelpInformer";
import { FaQuestion } from "react-icons/fa6";
import ChangeBaseDataOrganization from "./ChangeBaseDataOrganization";
import ChangeOptionData from "./ChangeOptionData";
import ChangeRequisites from "./ChangeRequisites";
import ListAdmins from "./ListAdmins";
import { TFullDataSettingOrganization } from "@/app/[INN]/main/setting/settingorganization/page";
import { TDataOrganization } from "@/Types/subtypes/TOrganization";

export type TFieldFormAdminPanel = {
  activeField: boolean;
  defaultData: Partial<TDataOrganization>;
  handlerChange: (e: React.ChangeEvent<any>) => void;
};

export type TFormAdminPanel = {
  INN: number;
  data: TFullDataSettingOrganization;
};

function FormAdminPanel({ data, INN }: TFormAdminPanel) {
  const dataUser = useDataUser((state) => state.dataUser) as TDBUser;
  const setOpenHelpInformer = useHelInformer((state) => state.setOpen);
  const messageInformer: TDataHelpInformer = useMemo(() => {
    if (dataUser.linksAllowed === "ADMIN") {
      return {
        title: "форма для редактирования информации по организации",
        listMessage: [
          "Данные доступны для изменения",
          "Добавьте печать в формате PNG для автоматического создания счетов",
          "Данную  информация могут изменять только руководитель/администратор",
          "Для автоматического  заполнения полей с реквизитами добавьте данные в формате PDF или DOCX в соответствующее поле",
        ],
      };
    } else {
      return {
        title: "форма для ознакомления с информацией о организации",
        listMessage: ["Данные не доступны для изменения"],
      };
    }
  }, []);
  const initialValues: Partial<TDataOrganization> = {
    ...data?.dataOrganization,
  };

  const onSubmit = async () => {};
  const { setFieldValue, handleChange, values } = useFormik({ initialValues, onSubmit });

  const openHelpWindow = useCallback(() => setOpenHelpInformer(true, messageInformer), []);
  

  return (
    <>
      <fieldset className=" border-2 border-solid border-menu_color p-2 text-2xl  rounded-md ">
        <legend className="pr-1 pl-1  text-sm ">
          Настройка Организации
          <button
            className="m-2 text  bg-red-50"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openHelpWindow();
            }}
          >
            <FaQuestion />
          </button>
        </legend>
        <form className="w-full h-full col-span-3">
          <section className="grid grid-cols-4 gap-5">
            <ChangeBaseDataOrganization
              activeField={dataUser.linksAllowed !== "ADMIN"}
              defaultData={initialValues}
              handlerChange={handleChange}
            />
            <ListAdmins admins={data.admins} />
            <InputPicture
              name="seal"
              imageHeight={0}
              imageWidth={0}
              imageAlt={""}
              handlerChangePicture={function (file: File): void {
                throw new Error("Function not implemented.");
              }}
              visible={false}
              defaultSrc={""}
            />
          </section>
          <section className=" grid grid-cols-3 gap-5 mt-3">
            <ChangeRequisites
              activeField={dataUser.linksAllowed !== "ADMIN"}
              defaultData={initialValues}
              handlerChange={handleChange}
            />
            <ChangeOptionData
              INN={INN}
              activeField={dataUser.linksAllowed !== "ADMIN"}
              defaultData={initialValues}
              handlerChange={handleChange}
            />
          </section>
          {dataUser.linksAllowed === "ADMIN" && (
            <button
              className=" mt-2 w-full"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              Сохранить
            </button>
          )}
        </form>
      </fieldset>
      <HelpInformerModalWindow />
    </>
  );
}
export default memo(FormAdminPanel);
