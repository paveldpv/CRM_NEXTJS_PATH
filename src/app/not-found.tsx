
import Link from "next/link";
import type { Metadata } from "next";
import { TbFaceIdError } from "react-icons/tb";
import { IoReturnDownBack } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "произошла ошибка",
};


export default async function NotFound() {
  return (
    <div className=" flex gap-4 flex-col  p-2">
      <div className=" flex  justify-around border-b-2 border-menu_color ">
        <span className=" text-4xl text-color_header">
          <TbFaceIdError />
        </span>
        <span className=" text-2xl">Страница не найдена</span>
      </div>
      <div >
        <p>произошла не предвиденная ошибка</p>
        <Link href="/" className=" rounded-md p-2 flex float-right justify-end bg-menu_color text-color_header hover:scale-110 hover:opacity-90 duration-500  delay-500 ">
          <span className=" text-4xl">
            <IoReturnDownBack />
          </span>
          <span className=" text-2xl">на главную</span>
        </Link>
      </div>
    </div>
  );
}
