"use client";
import { TLink } from "@/Types/Types"

import { motion } from "framer-motion"
import { useMemo } from "react"
import { adminLinks } from "../../../config/adminLinks"

import ListLinks from "./ListLinks"
import BottomNavBar from "./BottomNavBar"

import { TConfigAPP } from "@/Types/subtypes/TAppearanceConfigApp"
import { useInfoUser} from '../../../store/storeInfoUser'
import { useConfigApp } from '../../../store/storeConfigApp'


export default function NavBar() {
  const userData        = useInfoUser(store=>store.dataUser)
  const {configNavMenu} = useConfigApp(store=>store.dataConfigApp) as TConfigAPP
  // console.log(userData);
  
  const currentLink: TLink[] = useMemo(() => {
    if (userData.linksAllowed === "ADMIN") {
      return adminLinks;
    } else {
      return userData.linksAllowed;
    }
  }, [userData]);

  

 

  return (
    <motion.div
      initial={{ width: 45 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      whileHover={{ width: 175 }}
      className=" flex flex-col h-full  gap-3 pt-3  "
      style={{
        background: configNavMenu?.color?.bgColor,
				color: configNavMenu?.color?.textColor,
				borderColor: configNavMenu?.color?.borderColor,
				fontSize: configNavMenu?.textSize,  
      }}
    >
      <ListLinks listLinks={currentLink} />
      <BottomNavBar />
    </motion.div>
  );
}
