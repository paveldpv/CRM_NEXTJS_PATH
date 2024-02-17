"use client";

import { TConfigAPP, TDBUser } from "@/Types/Types";
import { useDataUser } from "../../../store/storeConfigApp";
import { signOut } from "next-auth/react";
import { hasNotIndicatedProperty } from "../../../function/hasNotIndicatedProperty";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ErrorHeader from "./ErrorHeader";

export default function Header() {
  const urlParams = useSearchParams();
  const [dataConfigApp, dataUser]: [Partial<TConfigAPP>, TDBUser] = useDataUser((state) => [
    state.dataConfigApp,
    state.dataUser,
  ]);
  const configHeader = dataConfigApp.configHeader;

  

  return (
    <div
      style={{
        background: configHeader?.color?.bgColor,
        color: configHeader?.color?.textColor,
        borderColor: configHeader?.color?.borderColor,
      }}
      className={`flex h-24   justify-between items-center  pr-7 pl-7 border-2 border-solid `}
    >
      <div>
        <ul className="text-list_menu flex flex-col gap-1 text-xs">
          <li className=" underline font-bold ">ИНН ОРГАНИЗАЦИИ : {dataUser.INN}</li>
          <li className=" "> - {dataUser.phone}</li>
          {hasNotIndicatedProperty(dataUser) ? (
            <Link className=" p-2 bg-menu_color rounded-md" href={`/main/setting?inn=${urlParams.get("inn")}`}>
              Данные не заполнены
            </Link>
          ) : (
            <ul>
              <li>{dataUser.lastName}</li>
              <li>{dataUser.name}</li>
              <li>{dataUser.surname}</li>
            </ul>
          )}
        </ul>
      </div>
      <div>
      
      </div>
    </div>
  );
}
