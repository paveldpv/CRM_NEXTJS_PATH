"use client";
import { TLink } from "@/Types/Types";
import { usePathname } from "next/navigation";
import { memo } from "react";
import Link, { type LinkProps } from "next/link";

import IconNav from "../additional/IconNav";

export type TPropsNavLink = Partial<TLink> & LinkProps & children;

type children = {
  children?: React.ReactNode;
  className?: string;
};
function NavLink({ className, description = ``, title = ``, id, children, ...props }: TPropsNavLink) {
  const pathName = usePathname();
  const activeLink = pathName.includes(props.href);
  const INN = pathName.split('/').filter(param=>!!param)[0]
 

  return (
    <span
      className={`${className}     border-2 border-solid  border-menu_color  p-2 rounded-xs h-10 hover:bg-color_header delay-100  duration-300 ${
        activeLink ? "bg-color_header  text-menu_color" : "bg-menu_color text-list_menu_even  "
      } `}
    >
      <Link  className="flex  gap-2 items-center    mx-auto my-0  " href={`/${INN}/main/${props.href}`}>
        <span className=" text-2xl ">{id && <IconNav id={id} />}</span>
        <span className=" truncate text-xs  ">{title}</span>
      </Link>
    </span>
  );
}
export default memo(NavLink);
