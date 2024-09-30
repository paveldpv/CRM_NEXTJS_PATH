import { create } from "zustand";
import { TDBUser,  } from "@/Types/Types";
import { keyConfigLayout } from "@/Types/enums";
import { TConfigAPP, TUpdateStateConfigApp } from "@/Types/subtypes/TAppearanceConfigApp";

type TStoreUserData = {  
  dataConfigApp:  Partial<TConfigAPP> ;  
  setDataConfigApp: (config:  Partial<TConfigAPP> ) => void;
  updateColor: (updateConfig: TUpdateStateConfigApp) => void;
  updateTextSize: (updateConfig: TUpdateStateConfigApp) => void;
  updateFont: (updateConfig: TUpdateStateConfigApp) => void;
};

export const useConfigApp = create<TStoreUserData>((set) => ({
 
  dataConfigApp: {},
  setDataConfigApp: (config) => {
    set({  dataConfigApp: config });
  },  

  updateColor: (updateConfig) => {
    set(({ dataConfigApp }) => {
      let newConfig = { ...dataConfigApp };      
      // @ts-ignore: error message
      newConfig[updateConfig.key].color[updateConfig.keyColorOption] = updateConfig.value;

      return {  dataConfigApp: newConfig };
    });
  },

  updateTextSize:(updateConfig)=> {
    console.log('update text size');
    
    console.log(updateConfig);
    
  },
  updateFont(updateConfig) {},
}));
