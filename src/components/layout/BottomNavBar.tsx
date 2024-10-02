'use client'
import { signOut } from "next-auth/react"
import { PiSignOutBold } from "react-icons/pi"
import { useConfigApp } from '../../../store/storeConfigApp'

export default function BottomNavBar() {
  const {configNavMenu} =useConfigApp(state=>state.dataConfigApp)
  const out = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <br />
      <div  style={{border:configNavMenu?.color.borderColor}}
      className=" w-full border-b-2 "></div>
      <button
      style={{
        background: configNavMenu?.color?.bgColor,
				color: configNavMenu?.color?.textColor,
				borderColor: configNavMenu?.color?.borderColor,
				fontSize: configNavMenu?.textSize,  
      }}
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
