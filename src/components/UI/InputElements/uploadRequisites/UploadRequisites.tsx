"use client";

import { TDBUser, TResponseUploadFiles } from "@/Types/Types";
import { useDataUser } from "../../../../../store/storeConfigApp";
import { NotData } from "@/Types/enums";
import { useId } from "react";


export type TUploadRequisites  = {
   setInfoFile:(data:TResponseUploadFiles|NotData)=>void
   setFiendValue:any,
   name:string
   InfoFile?:TResponseUploadFiles | NotData.notFile
   setLoader?:(load:boolean)=>void,

};

export default function UploadRequisites({}: TUploadRequisites) {
  const [infoUser] = useDataUser((state) => [state.dataUser as TDBUser]);
  const { idUser } = infoUser;
  const idInput =useId()
  

  return <div>uploadRequisites</div>;
}
