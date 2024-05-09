import { Suspense } from "react";
import type { Metadata } from "next";

import { dataLinkSetting} from "./dataLinksSetting";
import ListLinks from "@/components/layout/ListLinks";

export const metadata:Metadata={
  title:"Настройки",
  description:"Настройки приложения"
}


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <div className=" flex justify-center items-center">
            <span className="Loader">Загуржаем</span>
          </div>
        }
      >
        <div className="flex gap-1 pb-2 border-b-2 border-menu_color border-solid">
          <ListLinks listLinks={dataLinkSetting} className=""/>
        </div>
        {children}
      </Suspense>
    </>
  );
}
