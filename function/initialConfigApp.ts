import { TConfigAPP } from "@/Types/Types";
import { nameSettingLayout,keyConfigLayout } from "@/Types/enums";

const getInitialConfigApp = (idUser: string): TConfigAPP => {
  return {
    idUser: idUser,
    configHeader: {
      color: {
        bgColor: "#F47C28",
        textColor: "#4F5162",
        borderColor: "#7281C0",
      },
      font: "Comfortaa",
      textSize: "1.5rem",
      name: nameSettingLayout.header,
      keyConfig:keyConfigLayout.header
    },
    configMain: {
      color: {
        bgColor: "#F47C28",
        textColor: "#4F5162",
        borderColor: "#7281C0",
      },
      font: "Comfortaa",
      textSize: "1.5rem",
      name: nameSettingLayout.main,
      keyConfig:keyConfigLayout.main
    },    
    configNavMenu: {
      color: {
        bgColor: "#F47C28",
        textColor: "#4F5162",
        borderColor: "#7281C0",
      },
      font: "Comfortaa",
      textSize: "1.5rem",
      name: nameSettingLayout.navMenu,
      keyConfig:keyConfigLayout.navMenu
    },
  };
};
export default getInitialConfigApp;
