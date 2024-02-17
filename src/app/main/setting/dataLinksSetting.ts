import { TPropsNavLink } from "@/components/UI/NavLink";

export const dataLinkSetting: TPropsNavLink[] = [
  {
    description:"Настройка профиля",
    title:'Настройка профиля',
    href:'main/setting/profile'
  },{
    description: "Настройка приложения",
    title: "Настройка приложения",
    href: `main/setting/settingapp`,
  },
  {
    description: "Настройка организации",
    title: "Настройка организации",
    href: `main/setting/settingorganization`,
  },
];
