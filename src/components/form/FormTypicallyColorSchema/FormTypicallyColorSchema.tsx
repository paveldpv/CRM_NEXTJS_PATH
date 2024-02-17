import { dataTypicallyColor } from "./dataTypicallyColor";
import SelectTypicallyColor from "./SelectTypicallyColor";

export default function FormTypicallyColorSchema() {
  return (
    <fieldset className="border-2  border-solid border-menu_color p-2 text-xl  rounded-xs w-full ">
      <legend className="pr-1 pl-1  rounded-sm font-bold  bg-menu_color text-list_menu_even  rounded-xs ">
        Cтандартные схемы
      </legend>
      <ul className=" flex  gap-4 flex-wrap justify-evenly ">
        {dataTypicallyColor.map((element, index) => (
          <SelectTypicallyColor
            index={index}
            key={index}
            configBottom={element.configBottom}
            configHeader={element.configHeader}
            configMain={element.configMain}
            configNavMenu={element.configNavMenu}
          />
        ))}
      </ul>
    </fieldset>
  );
}
