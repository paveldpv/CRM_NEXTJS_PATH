import { TPropsNavLink } from "@/components/UI/NavLink";

export const dataLinkSetting: TPropsNavLink[] = [
  {
    description:"Настройка профиля",
    title:'Настройка профиля',
    href:'setting/profile'
  },{
    description: "Настройка приложения",
    title: "Настройка приложения",
    href: `setting/settingapp`,
  },
  {
    description: "Настройка организации",
    title: "Настройка организации",
    href: `setting/settingorganization`,
  },
  {
    description: "История входа в приложение",
    title: "История входа в приложение",
    href: `setting/historyEntryLocation/5/null/null`,
  },
  
];
