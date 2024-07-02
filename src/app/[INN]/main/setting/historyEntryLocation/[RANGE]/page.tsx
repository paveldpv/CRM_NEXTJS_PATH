import ListEntryPointsLocation from "@/containers/ListEntryPointsLocation";
import { TError } from "@/Types/subtypes/TError";

import { isError } from "../../../../../../../function/IsError";
import { unionArrObjViaKey } from "../../../../../../../function/unionArrObjViaKey";
import { redirect } from "next/navigation";
import { typicalError } from "@/Types/enums";
import ServiceUsers from "../../../../../../../Controllers/Service/Users";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { TDBUser } from "@/Types/Types";
import Link from "next/link";
import { ServiceGeoLocation } from "../../../../../../../Controllers/Service/serviceGeoLocation";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

export type TListEntryPointsLocation = {
  dataEntryUsers: (TDBUser & TGeoLocation)[];
};
export type TObjEmployee = {
  [key: string]: TDBUser;
};
export const revalidate = 10;

const getListEntryPoints = async (INN: string, range = 5): Promise<TListEntryPointsLocation | TError> => {
  const GeoLocation = new ServiceGeoLocation(INN);
  const dataEntryPoints = await GeoLocation.getDataLocation(range);
  if (isError(dataEntryPoints)) {
    return dataEntryPoints;
  }

  const listVisitingEmployee: string[] = dataEntryPoints.map((el) => el.idEmployee);

  const dataEmployee = await ServiceUsers.getUsersByListID(INN, listVisitingEmployee);

  if (isError(dataEmployee)) {
    return dataEmployee;
  }

  return { dataEntryUsers: unionArrObjViaKey(dataEntryPoints, dataEmployee, "idEmployee", "idUser") };
};

export default async function page({ params }: { params: { INN: string; RANGE: number } }) {
  const { RANGE, INN } = params;

  const data = await getListEntryPoints(INN, RANGE);

  if (isError(data)) {
    redirect(`/ERROR/${typicalError.error_DB}`); //на старницу с ошибки
  }
  const lengthListEntryPoints = data.dataEntryUsers.length;

  return (
    <div>
      <ul className="grid grid-cols-4 gap-2 mt-2">
        <li className="itemList">Сотрудник</li>
        <li className="itemList ">Цель</li>
        <li className="itemList ">Точка Входа</li>
        <li className="itemList ">время</li>
      </ul>

      <ListEntryPointsLocation dataEntryUsers={data.dataEntryUsers} />

      <div className=" flex justify-around mt-2">
        <Link
          hidden={+RANGE === 5}
          className=" rounded-lg text-4xl border-2 border-solid  border-menu_color  p-4 rounded-xs  hover:bg-color_header delay-100  duration-300"
          href={`${Number(RANGE) - 5}`}
        >
          <FaAngleLeft />
        </Link>
        <Link
          hidden={lengthListEntryPoints < +RANGE}
          className=" rounded-lg text-4xl border-2 border-solid  border-menu_color  p-4 rounded-xs  hover:bg-color_header delay-100  duration-300"
          href={`${Number(RANGE) + 5}`}
        >
          <FaAngleRight />
        </Link>
      </div>
    </div>
  );
}
