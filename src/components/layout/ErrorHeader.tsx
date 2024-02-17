import Link from "next/link";

export default function ErrorHeader() {
  return (
    <div className={`flex h-24  bg-red-400   justify-between items-center  pr-7 pl-7 border-2 border-solid `}>
      <div className=" text-yellow-50 text-4xl">
         Ошибка входа
      </div>
      <Link className="button" href={"/sign"}>
        назад
      </Link>
    </div>
  );
}
