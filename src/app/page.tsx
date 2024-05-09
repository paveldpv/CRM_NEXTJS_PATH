import Link from "next/link";



export default function page() {
  
  return (
    <>
      <ul className="  w-1/2 bg-color_header p-9 rounded-md  flex flex-col gap-4">
        <li>
          <Link className="labelForInput "
          href={"/sign"}>Войти</Link>
        </li>
        <hr />
        <li>
          <Link className="labelForInput" href={"/registrate"}>Регистрация</Link>
        </li>
        
      </ul>
    </>
  );
}
