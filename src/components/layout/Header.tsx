"use client";


import { hasNotIndicatedProperty } from "../../../function/hasNotIndicatedProperty"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

import { useInfoUser } from '../../../store/storeInfoUser'
import { useConfigApp } from '../../../store/storeConfigApp'

export default function Header() {
  const urlParams = useSearchParams();
  // console.log("🚀 ~ Header ~ urlParams:", urlParams)
  // console.log("🚀 ~ Header ~ urlParams:", urlParams.get('INN'))
  // console.log("🚀 ~ Header ~ urlParams:", urlParams.get('PHONE'))
  const dataUser = useInfoUser(store=>store.dataUser)
  const {configHeader}= useConfigApp(store=>store.dataConfigApp)
  
  
  

  return (
    <div
      style={{
        background: configHeader?.color?.bgColor,
        color: configHeader?.color?.textColor,
        borderColor: configHeader?.color?.borderColor,
        fontSize:configHeader?.textSize
      }}
      className={`flex h-24   justify-between items-center  pr-7 pl-7 border-2 border-solid `}
    >
      <div>
        <ul className="text-list_menu flex flex-col gap-1 text-xs">
          <li className=" underline font-bold ">ИНН ОРГАНИЗАЦИИ : {dataUser.INN}</li>
          <li className=" "> - {dataUser.phone}</li>
          {hasNotIndicatedProperty(dataUser) ? (
            <Link className=" p-2 bg-menu_color rounded-md" href={`/main/setting`}>
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
