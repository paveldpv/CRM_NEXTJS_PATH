"use client";
import { TConfigAPP, TDBUser } from "@/Types/Types";
import { useFormik } from "formik";
import { useDataUser } from "../../../../store/storeConfigApp";
import { useProcessLoader } from "../../../../store/storeProcessLoader";
import { useMiniLoader } from "../../../../store/storeMiniLoader";
import MiniLoader from "@/components/UI/Loaders/MiniLoader";
import { useEffect, useState } from "react";

import ChangeDataProfile from "./ChangeDataProfile";
import ChangePhotoProfile from "./ChangePhotoProfile";
import { fetchUpdateDataUser } from "../../../../service/fetchDataUser";
import { redirect } from "next/dist/server/api-utils";
import { fetchUploadFileOrganization } from "../../../../service/Server/fetchServer";
import { combineFilesToFormData } from "../../../../function/combineFilesToFormData";
import { useDialogWindow } from "../../../../store/storeDialogWindow";
import { typeDialog } from "@/Types/enums";

export default function FormProfile() {
  const [initialValues, setDataUser] = useDataUser((state) => [state.dataUser, state.setDataUser]);
  const setOpenDialogWindow = useDialogWindow((state) => state.setOpen);

  const [setVisibleLoader, visible] = useMiniLoader((state) => [
    state.setVisibleLoader,
    state.visible,
  ]);
  const [uploadPhoto, setUploadPhoto] = useState<File | null>();
  const [setVisibleProgress, setStatus] = useProcessLoader((state) => [
    state.setVisible,
    state.setStatus,
  ]);

  useEffect(() => {
    setVisibleLoader(false);
  }, [initialValues]);
  //#region SUBMIT
  const onSubmit = async () => {
    
    if (uploadPhoto) {
      setVisibleLoader(true);
      setVisibleProgress({ visible: true, step: 2 });
      setStatus("Сохранение фотографии");
      const fileUploadFormData = combineFilesToFormData([uploadPhoto]);
      const uploadPhotoServer = await fetchUploadFileOrganization(fileUploadFormData);
      if (uploadPhotoServer) {
        setStatus("Обновление данных");
        const updateDate = { ...values, srcPhoto: uploadPhotoServer[0] } as TDBUser;
        const response = await fetchUpdateDataUser(updateDate);
        if (response.success) {
          setDataUser(updateDate);
          setVisibleLoader(false);
          setVisibleProgress(false);
          setUploadPhoto(null)
        } else {
          setOpenDialogWindow(
            true,
            {
              title: "ошибка запроса",
              message: `повторите позже,ошибка : ${response.message}`,
            },
            typeDialog.error
          );
          return;
        }
      } else {
        setOpenDialogWindow(
          true,
          {
            title: "ошибка загрузки фотографии",
            message: `повторите позже`,
          },
          typeDialog.error
        );
        setVisibleLoader(false);
        setVisibleProgress(false);
        return;
      }
    } else {
      setVisibleLoader(true);
      setVisibleProgress({ visible: true, step: 1 });
      setStatus("Обновление данных");
      const response = await fetchUpdateDataUser(values);
      if (response.success) {
        setDataUser(values);
        setVisibleLoader(false);
        setVisibleProgress(false);
      } else {
        setOpenDialogWindow(
          true,
          {
            title: "ошибка запроса",
            message: `повторите позже,ошибка : ${response.message}`,
          },
          typeDialog.error
        );
        setVisibleLoader(false);
        setVisibleProgress(false);
        return;
      }
    }
  };
  //#endregion

  //#region useFormik
  const { setFieldValue, handleChange, values } = useFormik({
    initialValues,
    onSubmit,
  });

  //#endregion userFormik

  return (
    <fieldset className=" h-full border-2 border-menu_color rounded-xl border-solid  w-full ">
      <legend className="border-2 border-menu_color rounded-xl border-solid p-2  ml-6 ">
        Профиль
      </legend>
      <form className="w-full p-4">
        <div className=" grid grid-cols-3 mt-2 mb-2">
          <ChangeDataProfile
            values={values}
            handlerChange={handleChange}
            visible={visible}
            setFieldValue={setFieldValue}
          />
          <ChangePhotoProfile
            setFiledValue={setFieldValue}
            setData={setDataUser}
            dataUser={values}
            setVisible={setVisibleLoader}
            visible={visible}

            uploadPhoto={uploadPhoto}
            setUploadPhoto={setUploadPhoto}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className=" w-full "
        >
          Сохранить
        </button>
      </form>
    </fieldset>
  );
}
