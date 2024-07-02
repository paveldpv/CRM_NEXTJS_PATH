"use client";
import { PURPOSE_USE } from "@/Types/subtypes/TGeoLocation";
import { TDBUser } from "@/Types/Types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { processEntry } from "@/containers/ListEntryPointsLocation";
import { getAbbreviatedUser } from "../../../../function/getAbbreviatedUser";
import { usePathname, useRouter } from "next/navigation";
import { TQueryFilterPageGeoList } from "@/app/[INN]/main/setting/historyEntryLocation/[...FILTER]/page";

type TFilterQueryListLocation = {
  listEmployee: TDBUser[];
  filter: TQueryFilterPageGeoList;
};

export default function FIlterListGeoLocation({ listEmployee, filter }: TFilterQueryListLocation) {
  const [RANGE, SELECTED_PURPOSE_USE, SELECTED_ID_EMPLOYEE] = filter;

  const router = useRouter();
  const pathname = usePathname();

  const changeFilterEmployee = (e: SelectChangeEvent) => {
    let updateFilter = pathname.split("/");
    updateFilter[updateFilter.length - 1] = e.target.value;
    router.push(updateFilter.join("/"));
  };

  const changeFilterPurpose = (e: SelectChangeEvent) => {
    let updateFilter = pathname.split("/");
    updateFilter[updateFilter.length - 2] = e.target.value;
    router.push(updateFilter.join("/"));
  };

  return (
    <div className="grid grid-cols-4 gap-2 m-2">
      <Select value={SELECTED_ID_EMPLOYEE} onChange={changeFilterEmployee}>
        <MenuItem value={"null"}>сбросить</MenuItem>
        {listEmployee.map((user) => (
          <MenuItem value={user.idUser} key={user.idUser}>
            {getAbbreviatedUser(user)}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={SELECTED_PURPOSE_USE}
        MenuProps={{
          sx: {
            "&& .Mui-selected": {
              backgroundColor: "pink",
            },
          },
        }}
        onChange={changeFilterPurpose}
      >
        <MenuItem value={"null"}>Сбросить</MenuItem>
        <MenuItem value={PURPOSE_USE.auth}>{processEntry[PURPOSE_USE.auth].title}</MenuItem>
        <MenuItem value={PURPOSE_USE.redact}>{processEntry[PURPOSE_USE.redact].title}</MenuItem>
        <MenuItem value={PURPOSE_USE.registrate}>{processEntry[PURPOSE_USE.registrate].title}</MenuItem>
      </Select>
    </div>
  );
}
