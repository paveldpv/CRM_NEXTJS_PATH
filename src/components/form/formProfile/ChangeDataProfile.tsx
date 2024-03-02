import { TDBUser } from "@/Types/Types";



import {FormikErrors} from "formik"

import MiniLoader from "@/components/UI/Loaders/MiniLoader";
import InputDate from "@/components/UI/InputElements/InputDate/InputDate";

import TextField from "@mui/material/TextField";



type TChangeDataProfile = {
  visible: boolean;
  handlerChange: any;
  values: TDBUser;
  setFieldValue?:(field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> |Promise<FormikErrors<TDBUser>>
};


export default function ChangeDataProfile({
  visible,
  handlerChange,
  values,
  setFieldValue
}: TChangeDataProfile) {
  if (visible) {
    return (
      <section className=" flex justify-center items-center  border-r-2 border-solid border-menu_color col-span-2  ">
        <MiniLoader />
      </section>
    );
  } else {
    return (
      <section className="  border-r-2 pr-3 border-solid border-menu_color col-span-2   flex flex-col gap-3">
        <TextField
          value={values.name}
          name={"name"}
          onChange={handlerChange}
          label={"имя"}
          InputLabelProps={{
            style: { color: "#4F5162" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4F5162",
              },
            },
          }}
        />
        <TextField
          value={values.surname}
          name={"surname"}
          onChange={handlerChange}
          label={"фамилия"}
          InputLabelProps={{
            style: { color: "#4F5162" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4F5162",
              },
            },
          }}
        />
        <TextField
          value={values.lastName}
          name={"lastName"}
          onChange={handlerChange}
          label={"отчество"}
          InputLabelProps={{
            style: { color: "#4F5162" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4F5162",
              },
            },
          }}
        />
        <InputDate
          handlerChange={handlerChange}
          name="dateBirthday"
          title="день рождения"
          currentDate={values.dateBirthday?.toString()}
          setFieldValue={setFieldValue}
        />

        <hr />
        <TextField
          value={values.email}
          name={"email"}
          onChange={handlerChange}
          label={"эл.почта"}
          InputLabelProps={{
            style: { color: "#4F5162" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4F5162",
              },
            },
          }}
        />
        <TextField
          value={values.phone}
          name={"phone"}
          onChange={handlerChange}
          label={"номер телефона"}
          InputLabelProps={{
            style: { color: "#4F5162" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4F5162",
              },
            },
          }}
        />
        <hr />
        <TextField
          value={values.INN}
          name={"INN"}
          disabled
          label={"ИНН Организации"}
          InputLabelProps={{
            style: { color: "#4F5162" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4F5162",
              },
            },
          }}
        />
        {values.linksAllowed === "ADMIN" ? (
          <>
            <span>
              <h3 className="text-color_header">РУКОВОДИТЕЛЬ</h3>
              <h6>полный доступ</h6>
            </span>
          </>
        ) : (
          <>
            <TextField
              value={values.nameJobTitle}
              name={"nameJobTitle"}
              disabled
              label={"Должность"}
              InputLabelProps={{
                style: { color: "#4F5162" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#4F5162",
                  },
                },
              }}
            />
            <hr />
            <div>
              <h6>имеете доступ к ...</h6>
              <ul>
                {values?.linksAllowed?.map((link, index) => (
                  <li
                    className=" bg-menu_color text-list_menu_even rounded-xl text-lg  "
                    key={index}
                  >
                    {link.title}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </section>
    );
  }
}
