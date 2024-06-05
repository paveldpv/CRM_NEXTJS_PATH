import ListEntryPointsLocation from "@/containers/ListEntryPointsLocation";
import { TError } from "@/Types/subtypes/TError";
import ServiceGeoLocation, { getDataLocation } from "../../../../../../../Controllers/Service/GeoLocation";
import { isError } from "../../../../../../../function/IsError";
import { redirect } from "next/navigation";
import { typicalError } from "@/Types/enums";
import ServiceUsers from "../../../../../../../Controllers/Service/Users";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { TDBUser } from "@/Types/Types";

export type TListEntryPointsLocation = {
  dataEntryUsers: (TDBUser & TGeoLocation)[];
};
export type TObjEmployee = {
  [key: string]: TDBUser;
};
export const revalidate = 10;

const getListEntryPoints = async (INN: string, range = 10): Promise<TListEntryPointsLocation | TError> => {
  //add range list range
  const getDataEntryPoints = await ServiceGeoLocation.getDataLocation(INN);
  if (isError(getDataEntryPoints)) {
    return getDataEntryPoints;
  }
  const listVisitingEmployee: string[] = getDataEntryPoints.map((el) => el.idEmployee);

  const getDataEmployee = await ServiceUsers.getUsersByListID(INN, listVisitingEmployee);

  if (isError(getDataEmployee)) {
    return getDataEmployee;
  }
  //
  let objEmployee: TObjEmployee = {};
  let res!:TListEntryPointsLocation

  getDataEmployee.forEach((employee) => {
    objEmployee[employee.idUser] = employee;
  });


  getDataEntryPoints.forEach(elGeolocation => {
    res.dataEntryUsers.push({...elGeolocation,...objEmployee[elGeolocation.idEmployee]})
  });
  
  return res;
};

export default async function page({ params }: { params: { INN: string; RANGE: number } }) {
  const { RANGE, INN } = params;
  const data = await getListEntryPoints(INN, RANGE);
  if (isError(data)) {
    redirect(`/ERROR/${typicalError.error_DB}`); //на старницу с ошибки
  }

  return (
    <div>
      <ListEntryPointsLocation dataEntryUsers={data.dataEntryUsers} />
    </div>
  );
}
