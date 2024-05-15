"use client";
import { TDBUser, TFormRegistrate } from "@/Types/Types";
import { PURPOSE_USE, TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { typeDialog, typicalError } from "@/Types/enums";

import uniqid from "uniqid";

import { fieldData } from "./FieldData";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMiniLoader } from "../../../../store/storeMiniLoader";
import { useDialogWindow } from "../../../../store/storeDialogWindow";

import SignupSchemaFormRegistrate from "../../../../validateForm/validateFormRegistrate";

import { fetchRegistrate } from "../../../../service/fetch";

import Link from "next/link";
import MiniLoader from "@/components/UI/Loaders/MiniLoader";
import { useEffect } from "react";

export default function FormRegistrate() {
  const [loader, setLoader] = useMiniLoader((state) => [state.visible, state.setVisibleLoader]);
  const [setOpenDialog] = useDialogWindow((state) => [state.setOpen]);
  useEffect(() => {
    setLoader(false);
  }, []);
  const { push } = useRouter();

  const initialValues: TFormRegistrate = {
    email: "",
    password: "",
    phone: "",
    INN: null,
  };

  const onSubmit = async () => {    

    setLoader(true);
    if (Object.keys(errors).length) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const idNewAdmin = uniqid();
        const { latitude, longitude } = pos.coords;

        const dataGeo: Omit<TGeoLocation, "date"> = {
          location: {
            latitude,
            longitude,
          },
          process: PURPOSE_USE.registrate,
          idEmployee: idNewAdmin,
        };

        const newUser = {
          idUser: idNewAdmin,
          linksAllowed: "ADMIN",
          ...values,
        } as TDBUser;

        const candidateNewAdmin = await fetchRegistrate(newUser, dataGeo);

        if (candidateNewAdmin.success) {     
          
          localStorage.setItem("mes_phone",newUser.phone)
          localStorage.setItem("mes_INN", newUser.INN);
          localStorage.setItem("mes_password", newUser.password);

          setLoader(false);
          setOpenDialog(true, { title: "регистрация прошла успешно"});

          setTimeout(() => {
            setOpenDialog(false);
            push("/sign");
          }, 1700);
        }
        else{
          
          
          setOpenDialog(true, { title: "Ошибка", message: candidateNewAdmin.message }, typeDialog.error);
        }
        setLoader(false)
      },
      (errGeo) => {
        push(`/ERROR/${typicalError.not_geo}`);
      }
    );
  };

  const { handleChange, values, errors, setErrors } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: SignupSchemaFormRegistrate,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={` relative w-3/4  `}
    >
      <MiniLoader className=" absolute left-1/2  top-56 scale-150" />

      <div
        className={`bg-color_header p-9 rounded-md flex flex-col gap-4  ${
          loader && "blur-md opacity-70 delay-500  duration-500"
        }`}
      >
        {fieldData.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.title} className="labelForInput">
              {field.placeholder}
            </label>
            <input
              disabled={loader}
              name={field.title}
              id={field.title}
              type={field.type}
              placeholder={field.placeholder}
              // @ts-ignore: error message
              className={`customInput ${!!errors[field.title] && " bg-red-700"}`}
              onChange={handleChange}
              // @ts-ignore: error message
              value={`${[values[field.title]]}`}
            />
            {/* @ts-ignore: error message */}
            {!!errors[field.title] && (
              // @ts-ignore: error message
              <span className=" pt-4 select-none text-xl  text-red-900 mt-4 font-bold ">
                {
                  // @ts-ignore: error message
                  errors[field.title]
                }
              </span>
            )}
          </div>
        ))}
        <button type="submit" hidden={loader} className={`buttonSubmit`}>
          Регистрация
        </button>
        <Link
          hidden={loader}
          className=" rounded-xl p-5 bg-highlight_two w-24 font-bold text-4xs hover:underline hover:text-highlight_one"
          href={"/sign"}
        >
          Войти
        </Link>
      </div>
    </form>
  );
}
