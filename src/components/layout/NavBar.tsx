"use client";
import { TLink, TConfigAPP, TDBUser } from "@/Types/Types";
import { useDataUser } from "../../../store/storeConfigApp";
import { motion } from "framer-motion";
import { useCallback, useMemo } from "react";
import { adminLinks } from "../../../config/adminLinks";

import ListLinks from "./ListLinks";
import BottomNavBar from "./BottomNavBar";

import { signOut } from "next-auth/react";


export default function NavBar() {
  const [dataConfig, userData]: [Partial<TConfigAPP>, TDBUser] = useDataUser((state) => [
    state.dataConfigApp,
    state.dataUser,
  ]);
  const currentLink: TLink[] = useMemo(() => {
    if (userData.linksAllowed === "ADMIN") {
      return adminLinks;
    } else {
      return userData.linksAllowed;
    }
  }, [userData]);
  const configNavMenu = dataConfig.configNavMenu;

  const out = useCallback(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <motion.div
      initial={{ width: 45 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      whileHover={{ width: 175 }}
      className=" flex flex-col h-full   gap-3 pt-3 bg-menu_color"
      // style={{
      //   background: configNavMenu?.color?.bgColor,
      //   color: configNavMenu?.color?.textColor,
      //   borderColor: configNavMenu?.color?.borderColor,
      // }}
    >
      <ListLinks listLinks={currentLink} />
      <BottomNavBar />
    </motion.div>
  );
}
