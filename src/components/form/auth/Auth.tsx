"use client";
import { TFormLogin } from "@/Types/Types";

import { signIn } from "next-auth/react";

import { useFormik } from "formik";
import { useMiniLoader } from "../../../../store/storeMiniLoader";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDialogWindow } from "../../../../store/storeDialogWindow";

import LoginSchemaForm from "../../../../validateForm/validateFormAuth";

import Link from "next/link";
import MiniLoader from "@/components/UI/Loaders/MiniLoader";
import { typeDialog, typicalError } from "@/Types/enums";

export default function Auth() {
  const { push } = useRouter();
  const params = useSearchParams();
  const [loader, setLoader] = useMiniLoader((state) => [state.visible, state.setVisibleLoader]);
  const [setOpenDialog] = useDialogWindow((state) => [state.setOpen]);

  useEffect(() => {
    setLoader(false);
  }, []);

  const initialValues: TFormLogin = {
    password: globalThis?.localStorage?.getItem("mes_password") || ``,
    phone: globalThis?.localStorage?.getItem("mes_phone") || ``,
    INN: Number(globalThis?.localStorage?.getItem("mes_INN") || params.get("inn")) || null,
  };

  const onSubmit = async () => {
    setLoader(true);

    if (Object.keys(errors).length) return;
    const res = await signIn("credentials", {
      phone: values.phone,
      password: values.password,
      INN: values.INN,
      redirect: false,
    });
    console.log(res);
    if (!res?.error) {
      localStorage.setItem("mes_phone", values.phone);
      localStorage.setItem("mes_INN", `${values.INN}`);
      localStorage.setItem("mes_password", values.password);
      push(`/${values.INN}/main`);
      //router.push(`/main`);
      // router.push(`/main?inn=${values.INN}`);
      // router.push(`/main`);
    } else {
      setOpenDialog(true, { title: "Ошибка" }, typeDialog.error);
      setTimeout(() => {
        push(`/ERROR/${typicalError.not_valid_password}`);
      }, 1700);
    }
  };

  const { values, handleChange, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: LoginSchemaForm,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="  w-3/4 relative "
    >
      <MiniLoader className=" scale-150 absolute left-1/2 top-32 " />
      <ul
        className={` bg-color_header p-9 rounded-md  flex flex-col gap-4 ${
          loader && "blur-md opacity-70 delay-500  duration-500"
        }`}
      >
        <li>
          <label className="labelForInput" htmlFor="phone">
            номер телефона*
          </label>
          <input
            disabled={loader}
            className="customInput"
            type="text"
            name="phone"
            id="phone"
            placeholder="номер телефона"
            value={values.phone}
            onChange={handleChange}
          />
          {!!errors.phone && (
            <span className=" pt-4 select-none text-xl  text-red-900 mt-4 font-bold ">{errors.phone}</span>
          )}
        </li>
        <li>
          <label className="labelForInput" htmlFor="phone">
            ИНН организации
          </label>
          <input
            disabled={loader}
            className="customInput"
            type="text"
            name="INN"
            id="INN"
            placeholder="ИНН"
            value={Number(values.INN)}
            onChange={handleChange}
          />
          {!!errors.INN && (
            <span className=" pt-4 select-none text-xl  text-red-900 mt-4 font-bold ">{`${errors.INN}`}</span>
          )}
        </li>
        <li>
          <label className="labelForInput" htmlFor="password">
            пароль*
          </label>
          <input
            disabled={loader}
            className="customInput"
            type="password"
            name="password"
            id="password"
            placeholder="пароль"
            value={values.password}
            onChange={handleChange}
          />
          {!!errors.password && (
            <span className=" pt-4 select-none text-xl  text-red-900 mt-4 font-bold ">{errors.password}</span>
          )}
        </li>
        <button className="buttonSubmit" type="submit" hidden={loader}>
          Войти
        </button>
        <Link
          hidden={loader}
          className=" w-44 rounded-xl p-5 bg-highlight_two  font-bold text-4xs hover:underline hover:text-highlight_one"
          href={"/registrate"}
        >
          регистрация
        </Link>
      </ul>
    </form>
  );
}
