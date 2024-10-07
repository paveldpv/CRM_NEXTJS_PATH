import { TPropsNavLink } from "@/components/UI/NavLink";
import { idLink } from "@/Types/enums";
export const dataLinkSetting: TPropsNavLink[] = [
  {
    id: idLink.setting_profile,
    description: "Настройка профиля",
    title: "Настройка профиля",
    href: "setting/profile",
  },
  {
    id: idLink.setting_app,
    description: "Настройка приложения",
    title: "Настройка приложения",
    href: `setting/settingapp`,
  },
  {
    id: idLink.setting_organization,
    description: "Настройка организации",
    title: "Настройка организации",
    href: `setting/settingorganization`,//TODO:
  },
  {
    id: idLink.setting_history_entry_location,
    description: "История входа в приложение",
    title: "История входа в приложение",    
    href: `setting/historyEntryLocation`,
    paramsHref: ["5", "null", "null"], //[rangePage,process,idEmployee]
  },
];
