import { TDaDataOrganization, TDataOrganization } from "@/Types/subtypes/TOrganization";
import { TAnswerUpdateDB } from "@/Types/Types";
import moment from "moment";
import ControllerOrganizationDB from "../ControllersDB/Collection/OrganizationDB";
import { fetchGetDataOrganization } from "../../service/DaData/getDataOrganization";

import { isError } from "../../function/IsError";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import ControllerGeoLocation from "./GeoLocation";

export const getParamsOrganization = async (INN: number): Promise<TDataOrganization | undefined> => {
  try {
    return await ControllerOrganizationDB.getParamsOrganization(INN);
  } catch (error) {
    console.log(`error get params organization ,INN :${INN},error :${error}`);
    return undefined;
  }
};
export const updateParamsOrganization = async (data: TDataOrganization): Promise<TAnswerUpdateDB> => {
  try {
    return await ControllerOrganizationDB.updateParamsOrganization(data);
  } catch (error) {
    return {
      success: false,
      message: `error update params organization , data update :${data},/n error:${error}`,
    };
  }
};

export const createNewOrganization = async (INN: number, idAdministrator: string ,dateCreate:Date,dataGeo:TGeoLocation): Promise<TAnswerUpdateDB> => {
  try {
    let dataOrganization = await fetchGetDataOrganization({ query: INN.toString() });

   

    
    
    if (isError(dataOrganization)) {
      return {
        success: dataOrganization.error,
        message: dataOrganization.message,
      };
    }

    dataOrganization.dataRegistrateFormApp = dateCreate;
    dataGeo.date = dateCreate
   
  
    const saveGeoLocation     = await ControllerGeoLocation.setDataLocation(INN.toString(),dataGeo)
    const saveNewOrganization = await ControllerOrganizationDB.createNewOrganization(dataOrganization, INN.toString());
    

    return saveNewOrganization
  } catch (error) {
    return {
      success: false,
      message: `error create new Organization , INN:${INN},error:${error}`,
    };
  }
};

const ControllerOrganization = {
  getParamsOrganization,
  updateParamsOrganization,
  createNewOrganization,
};

module.exports = ControllerOrganization;

export default ControllerOrganization;
