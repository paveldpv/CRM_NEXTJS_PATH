import { TFieldFormAdminPanel } from "./FormAdminPanel";
import TextField from "@mui/material/TextField";

import { styleTextFiled } from "../../../../config/muiCustomStyle/textField";
import { InputAdornment } from "@mui/material";

import moment from "moment";

export type TChangeBaseData = {} & TFieldFormAdminPanel;
/**
 * update,viewing and redaction data:
 *
 * INN
 * Name Organization
 * date registration
 */

export default function ChangeBaseDataOrganization({
  activeField,
  defaultData,
  handlerChange,
}: TChangeBaseData) {
  return (
    <fieldset className="border-2 border-solid border-menu_color p-3 text-xs  rounded-xs  rounded-md col-span-2">
      <legend className=" pr-1 pl-1">Основное</legend>
      <div className=" flex  flex-col gap-2">
        <TextField disabled value={defaultData.INN} {...styleTextFiled} name="INN" placeholder="ИНН" />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span className="  rounded-sm p-1">«ООО»</span>
              </InputAdornment>
            ),
            style: { color: "#64A989", fontSize: 18, borderColor: "#64A989" },
          }}
          onChange={handlerChange}
          placeholder="Название организации"
          disabled={activeField}
          defaultValue={defaultData?.nameOrganization}
          {...styleTextFiled}
          name="nameOrganization"
          multiline
          label="название организации"
        />
        <span className=" pt-2">          
          дата регистрации в системе : {moment(defaultData.dateRegistration).format("D/M/YYYY")}
        </span>
      </div>
    </fieldset>
  );
}
