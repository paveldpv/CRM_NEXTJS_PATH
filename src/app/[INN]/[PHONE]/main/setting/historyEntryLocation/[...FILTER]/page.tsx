import ListEntryPointsLocation from "@/containers/ListEntryPointsLocation";
import { TError } from "@/Types/subtypes/TError";
import { PURPOSE_USE } from "@/Types/subtypes/TGeoLocation";

// import { isError } from "../../../../../../../function/IsError";
// import { unionArrObjViaKey } from "../../../../../../../function/helpers/unionArrObjViaKey";
import { redirect } from "next/navigation";
import { typicalError } from "@/Types/enums";
// import ServiceUsers from "../../../../../../../Controllers/Service/Users";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { TDBUser } from "@/Types/Types";
// import { ServiceGeoLocation } from "../../../../../../../Controllers/Service/serviceGeoLocation";
import FIlterListGeoLocation from "@/components/form/filterListGeoLocation/FIlterListGeoLocation";
import NextAndPrevPageNavigator from "@/components/layout/NextAndPrevPageNavigator";
import { isError } from '../../../../../../../../function/IsError'
import { unionArrObjViaKey } from '../../../../../../../../function/helpers/unionArrObjViaKey'
import { ServiceGeoLocation } from '../../../../../../../../Controllers/Service/serviceGeoLocation'
import { ServiceUsers } from '../../../../../../../../Controllers/Service/serviceUser'

export type TListEntryPointsLocation = {
  dataEntryUsers: (TDBUser & TGeoLocation)[];
  listEmployee: TDBUser[];
};
export type TQueryFilterPageGeoList = [number, PURPOSE_USE | "null", string | "null"];
export const revalidate = 10;

const getListEntryPoints = async (INN: string, FILTER: TQueryFilterPageGeoList): Promise<TListEntryPointsLocation | TError> => {
  const [range, PURPOSE_USE, ID_EMPLOYEE] = FILTER;

  const geoLocation = new ServiceGeoLocation(INN);
  const serviceUser  = new ServiceUsers(INN)
  const dataEntryPoints = await geoLocation.getDataLocation(range);
  if (isError(dataEntryPoints)) {
    return dataEntryPoints;
  }

  const listVisitingEmployee: string[] = dataEntryPoints.map((el) => el.idEmployee);

  const dataEmployee = await serviceUser.getUsersByGroupID(listVisitingEmployee);

  if (isError(dataEmployee)) {
    return dataEmployee;
  }
  const unionDataEntryPoint = unionArrObjViaKey(dataEntryPoints, dataEmployee, "idEmployee", "idUser");
  
  return {
    listEmployee: dataEmployee,
    dataEntryUsers: unionDataEntryPoint
      .filter((filterPurpose) => {
        if (PURPOSE_USE != "null" && !!PURPOSE_USE) {
          return filterPurpose.process === PURPOSE_USE;
        } else {
          return filterPurpose;
        }
      })
      .filter((filterUser) => {
        if (ID_EMPLOYEE != "null" && !!ID_EMPLOYEE) {
          return filterUser.idEmployee === ID_EMPLOYEE;
        } else {
          return filterUser;
        }
      }),
  };
};

export default async function page({ params }: { params: { INN: string; FILTER: TQueryFilterPageGeoList } }) {
  const { FILTER, INN } = params;
  const [RANGE, PROCESS, ID_EMPLOYEE] = FILTER;

  const data = await getListEntryPoints(INN, FILTER);

  if (isError(data)) {
    redirect(`/ERROR/${typicalError.error_DB}`); 
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
      <FIlterListGeoLocation listEmployee={data.listEmployee} filter={FILTER} initialRangeGroup={5} />
      <ListEntryPointsLocation dataEntryUsers={data.dataEntryUsers} />

      <div className=" flex justify-around mt-2">
        <NextAndPrevPageNavigator
          initialLengthGroup={5}
          currentLengthGroup={lengthListEntryPoints}
          rangeGroupPage={Number(RANGE)}
          schemaLinkPage={(range) => `/${INN}/main/setting/historyEntryLocation/${range}/${PROCESS}/${ID_EMPLOYEE}`}
        />
      </div>
    </div>
  );
}
