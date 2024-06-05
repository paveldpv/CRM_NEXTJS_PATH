"use client";
import {  TDBUser } from "@/Types/Types";
import { useMiniLoader } from "../../../store/storeMiniLoader";
import { useEffect } from "react";
import { useDataUser } from "../../../store/storeConfigApp";
import { TConfigAPP } from "@/Types/subtypes/TAppearanceConfigApp";

export type TWrapper = {
  dataUser: Omit<TDBUser, "password">;
  dataConfigApp: { [index: string]: Partial<TConfigAPP> };
};

export default function Wrapper({ dataConfigApp, dataUser }: TWrapper) {
  const [setData] = useDataUser((state) => [state.setData]);

  useEffect(() => {
    setData(dataConfigApp, dataUser);
  }, []);

  return (
    <div className=" overflow-x-auto p-2 " >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum praesentium reprehenderit aspernatur sunt
      deleniti consequatur molestiae accusantium error, cupiditate aperiam sint explicabo nobis, incidunt ut unde aut,
      id suscipit laboriosam!
      {dataUser.email}
    </div>
  );
}
