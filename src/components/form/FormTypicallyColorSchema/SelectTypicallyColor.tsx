import { TConfigAPP } from "@/Types/Types";
import React from "react";

export type TSelectTypicallyColor = Omit<TConfigAPP, "idUser"> & {index:number};

export default function SelectTypicallyColor({
  configBottom,
  configHeader,
  configMain,
  configNavMenu,
  index
}: TSelectTypicallyColor) {
  return (
    <li className="  flex flex-col justify-center items-center gap-1 w-1/3 rounded-md p-2 m-2">
      <label
        htmlFor={`labelFrom-[${index}]`}
        className="  ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-full rounded-xl  "
      >
        <div className="w-full h-44 flex flex-col ">
          {/* HEADER */}
          <section
            style={{ background: `${configHeader.color.bgColor}`, borderColor: `${configHeader.color.borderColor}` }}
            className="  bg-red-400 h-1/5 w-full border-2"
          ></section>
          <div className="flex-shrink-1 flex-grow-1 basis-10/12 flex ">
            {/* NAVMENU */}
            <section
              style={{
                background: `${configNavMenu.color.bgColor}`,
                borderColor: `${configNavMenu.color.borderColor}`,
              }}
              className=" bg-blue-500 w-1/5 h-full border-2"
            ></section>
            {/* MAIN */}
            <section
              style={{ background: `${configMain.color.bgColor}`, borderColor: `${configMain.color.borderColor}` }}
              className=" bg-gray-500 w-full h-full border-2"
            ></section>
          </div>
          {/* BOOTOM */}
          <section 
          style={{ background: `${configBottom.color.bgColor}`, borderColor: `${configBottom.color.borderColor}` }}
          className="  bg-green-500 h-1/5 w-full border-2"></section>
        </div>
      </label>
      <input
        className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        type="radio"
        name='radio'
        id={`labelFrom-[${index}]`}
      />
    </li> 
  );
}
