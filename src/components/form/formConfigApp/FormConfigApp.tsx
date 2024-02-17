"use client";
import { useDataUser } from "../../../../store/storeConfigApp";
import { TConfigAPP, TConfigLayout, TDBUser } from "@/Types/Types";
import { useMemo } from "react";
import InputSettingColorLayout from "@/components/additional/InputSettingColorLayout";

export default function FormConfigApp() {
  const [dataConfigApp, dataUser]: [Partial<TConfigAPP>, TDBUser] = useDataUser((state) => [
    state.dataConfigApp,
    state.dataUser,
  ]);
  const arrayConfigApp: (TConfigLayout | undefined)[] = useMemo(
    () => [
      dataConfigApp?.configBottom,
      dataConfigApp?.configHeader,
      dataConfigApp?.configMain,
      dataConfigApp?.configNavMenu,
    ],
    [dataConfigApp]
  );

  //  console.log("🚀 ~ FormConfigApp ~ arrayConfigApp:", arrayConfigApp)

  return (
    <fieldset className="border-2  border-solid border-menu_color p-2 text-xl  rounded-xs w-full ">
      <legend className="pr-1 pl-1  rounded-sm font-bold  bg-menu_color text-list_menu_even  rounded-xs ">
        Настройки приложения
      </legend>
      <ul className=" flex flex-col gap-4">
        {arrayConfigApp &&
          arrayConfigApp.map((config, index) => (
            <InputSettingColorLayout
              key={index}
              keyConfig={config?.keyConfig!}
              color={config?.color!}
              font={config?.font!}
              textSize={config?.textSize!}
              name={config?.name!}
            />
          ))}
      </ul>
    </fieldset>
  );
}
