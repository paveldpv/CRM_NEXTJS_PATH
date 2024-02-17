import { idLink } from "@/Types/enums";
import NavLink from "../UI/NavLink";
import { signOut } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";

export default function BottomNavBar() {
  const out = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <br />
      <div className=" w-full border-b-2 bg-list_menu_even"></div>
      <NavLink id={idLink.setting} href={"main/setting"} description="Настройки" title="Настройки" />
      <button
        className="border-2 border-solid p-2 border-menu_color rounded-xs h-16 text-list_menu_even hover:bg-color_header  "
        onClick={out}
      >
        <span className="flex  gap-2 items-center   mx-auto my-0 duration-300  ">
          <span className=" text-2xl">
            <PiSignOutBold />
          </span>
          <span className=" truncate text-xs">Выйти</span>
        </span>
      </button>
    </>
  );
}
