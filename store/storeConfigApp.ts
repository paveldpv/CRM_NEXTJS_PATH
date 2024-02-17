import { create } from "zustand";
import { TConfigAPP, TDBUser, TUpdateStateConfigApp } from "@/Types/Types";
import { keyConfigLayout } from "@/Types/enums";

type TStoreUserData = {
  dataUser: any;
  dataConfigApp: { [index: string]: Partial<TConfigAPP> };
  loading: Boolean;
  setDataUser:(dataUser:TDBUser)=>void
  setData: (config: { [index: string]: Partial<TConfigAPP> }, user: Omit<TDBUser, "password">) => void;
  updateColor: (updateConfig: TUpdateStateConfigApp) => void;
  updateTextSize: (updateConfig: TUpdateStateConfigApp) => void;
  updateFont: (updateConfig: TUpdateStateConfigApp) => void;
};

export const useDataUser = create<TStoreUserData>((set) => ({
  loading: false,
  dataUser: {},
  dataConfigApp: {},
  setData: (config, user) => {
    set({ dataUser: user, dataConfigApp: config });
  },
  setDataUser(dataUser) {
    set({dataUser})
  },

  updateColor: (updateConfig) => {
    set(({ dataConfigApp, dataUser }) => {
      let newConfig = { ...dataConfigApp };      
      // @ts-ignore: error message
      newConfig[updateConfig.key].color[updateConfig.keyColorOption] = updateConfig.value;

      return { ...dataUser, dataConfigApp: newConfig };
    });
  },

  updateTextSize(updateConfig) {},
  updateFont(updateConfig) {},
}));
