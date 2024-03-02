"use client";
import { TFormLogin } from "@/Types/Types";
import { useFormik } from "formik";
import LoginSchemaForm from "../../../../validateForm/validateFormAuth";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState,useLayoutEffect } from "react";


export default function Auth() {
  const router = useRouter();
  const params = useSearchParams();
 

  const initialValues: TFormLogin = {
    password: globalThis?.localStorage?.getItem("mes_password") || ``,
    phone: globalThis?.localStorage?.getItem("mes_phone") || ``,
    INN: Number(globalThis?.localStorage?.getItem("mes_INN") || params.get("inn")) || null,
  };

  const onSubmit = async () => {
    console.log(`not submit`);

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
      router.push(`/${values.INN}/main`);
      //router.push(`/main`);
      
    } else {
      alert(res.error);
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
      className="  w-3/4 bg-color_header p-9 rounded-md  flex flex-col gap-4"
    >
      <ul>
        <li>
          <label className="labelForInput" htmlFor="phone">
            номер телефона*
          </label>
          <input
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
      </ul>
      <button className="buttonSubmit" type="submit">
        Войти
      </button>
      <Link
        className=" w-44 rounded-xl p-5 bg-highlight_two  font-bold text-4xs hover:underline hover:text-highlight_one"
        href={"/registrate"}
      >
        регистрация
      </Link>
    </form>
  );
}
