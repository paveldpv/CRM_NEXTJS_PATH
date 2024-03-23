
import { TDBUser } from "@/Types/Types";



export default function ListAdmins({ admins }: { admins?: TDBUser[] }) {
  

  return (    
    
      <fieldset className=" border-2 border-solid border-menu_color p-3 text-xs  rounded-xs  rounded-md  col-span-1">
        {admins ? (
          <>
            <legend className="pr-1 pl-1">
              {admins.length > 2 ? <span>Администраторы</span> : <span>Администратор</span>}
            </legend>
            <ul className=" flex flex-col   gap-5 max-h-20 overflow-auto">
              {admins.map((admin, index) => (
                <li key={index} className=" text-menu_color bg-color_header rounded-md  p-2 text-center">
                  <span className=" text-xl ">
                    {admin.surname} {admin.name} {admin.lastName}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h4>ошибка загрузки списка Администраторов</h4>
        )}
      </fieldset>
    
  );
}
