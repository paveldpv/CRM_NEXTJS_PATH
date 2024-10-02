"use client";
import { memo, useCallback } from "react";
import { PURPOSE_USE } from "@/Types/subtypes/TGeoLocation";
import { TDBUser } from "@/Types/Types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { processEntry } from "@/containers/ListEntryPointsLocation";
import { getAbbreviatedUser } from "../../../../function/getAbbreviatedUser";
import { usePathname, useRouter } from "next/navigation";

import { MdOutlineCancel } from "react-icons/md";
import { TQueryFilterPageGeoList } from '@/app/[INN]/[PHONE]/main/setting/historyEntryLocation/[...FILTER]/page'
type TFilterQueryListLocation = {
  listEmployee: TDBUser[];
  filter: TQueryFilterPageGeoList;
  initialRangeGroup: number;
};

function FIlterListGeoLocation({ listEmployee, filter, initialRangeGroup }: TFilterQueryListLocation) {
  const [RANGE, SELECTED_PURPOSE_USE, SELECTED_ID_EMPLOYEE] = filter;

  const router = useRouter();
  const pathname = usePathname();

  const changeFilterEmployee = useCallback(
    (e: SelectChangeEvent) => {
      let updateFilter = pathname.split("/");
      updateFilter[updateFilter.length - 1] = e.target.value;
      updateFilter[updateFilter.length - 3] = initialRangeGroup.toString();

      router.push(updateFilter.join("/"));
    },
    [initialRangeGroup, pathname, router]
  );

  const changeFilterPurpose = useCallback(
    (e: SelectChangeEvent) => {
      let updateFilter = pathname.split("/");
      updateFilter[updateFilter.length - 2] = e.target.value;
      updateFilter[updateFilter.length - 3] = initialRangeGroup.toString();
      router.push(updateFilter.join("/"));
    },
    [initialRangeGroup, pathname, router]
  );

  const restSearchEmployee = useCallback(() => {
    let updateFilter = pathname.split("/");
    updateFilter[updateFilter.length - 1] = "null";
    updateFilter[updateFilter.length - 3] = initialRangeGroup.toString();

    router.push(updateFilter.join("/"));
  }, [initialRangeGroup, pathname, router]);

  const resetSearchPurposeUse = useCallback(() => {
    let updateFilter = pathname.split("/");
    updateFilter[updateFilter.length - 2] = "null";
    updateFilter[updateFilter.length - 3] = initialRangeGroup.toString();

    router.push(updateFilter.join("/"));
  }, [initialRangeGroup, pathname, router]);

  return (
    <div className="grid grid-cols-4 gap-2 m-2">
      <div className=" flex  gap-1 ">
        <Select fullWidth value={SELECTED_ID_EMPLOYEE} onChange={changeFilterEmployee}>
          {listEmployee.map((user) => (
            <MenuItem value={user.idUser} key={user.idUser}>
              {getAbbreviatedUser(user)}
            </MenuItem>
          ))}
        </Select>
        {SELECTED_ID_EMPLOYEE != "null" && (
          <button className=" text-4xl grid-cols-1 flex  items-center  content-center" onClick={restSearchEmployee}>
            <MdOutlineCancel />
          </button>
        )}
      </div>
      <div className=" flex gap-1 ">
        <Select
          fullWidth
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
          <MenuItem value={PURPOSE_USE.auth}>{processEntry[PURPOSE_USE.auth].title}</MenuItem>
          <MenuItem value={PURPOSE_USE.redact}>{processEntry[PURPOSE_USE.redact].title}</MenuItem>
          <MenuItem value={PURPOSE_USE.registrate}>{processEntry[PURPOSE_USE.registrate].title}</MenuItem>
        </Select>
        {SELECTED_PURPOSE_USE != "null" && (
          <button className=" text-4xl grid-cols-1 flex content-center items-center" onClick={resetSearchPurposeUse}>
            <MdOutlineCancel />
          </button>
        )}
      </div>
    </div>
  );
}
export default memo(FIlterListGeoLocation);
