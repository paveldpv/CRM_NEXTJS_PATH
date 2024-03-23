"use client";
import { useFormik } from "formik";
import { fieldData } from "./FieldData";
import Link from "next/link";
import SignupSchemaFormRegistrate from "../../../../validateForm/validateFormRegistrate";
import { TDBUser, TFormRegistrate } from "@/Types/Types";
import uniqid from "uniqid";
import { fetchRegistrate } from "../../../../service/fetch";

type Props = {};

export default function FormRegistrate({}: Props) {
  const initialValues: TFormRegistrate = {
    email: "",
    password: "",
    phone: "",
    INN: null,
  };
  const onSubmit = async () => {
    if (Object.keys(errors).length) return;
    const newUser = {
      idUser: uniqid(),
      linksAllowed: "ADMIN",
      dateRegistrate: new Date(),
      ...values,
    } as TDBUser; 

    const candidateNewAdmin = await fetchRegistrate(newUser);
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
      className="  w-3/4 bg-color_header p-9 rounded-md  flex flex-col gap-4"
    >
      {fieldData.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.title} className="labelForInput">
            {field.placeholder}
          </label>
          <input
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
      <button type="submit" className="buttonSubmit">
        Регистрация
      </button>
      <Link
        className=" rounded-xl p-5 bg-highlight_two w-24 font-bold text-4xs hover:underline hover:text-highlight_one"
        href={"/sign"}
      >
        Войти
      </Link>
    </form>
  );
}
