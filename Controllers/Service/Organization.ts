import {  TDataOrganization } from "@/Types/subtypes/TOrganization";
import { TAnswerUpdateDB } from "@/Types/Types";
import moment from "moment";
import { fetchGetDataOrganization } from "../../service/DaData/getDataOrganization";

import { isError } from "../../function/IsError";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";

import ServiceGeoLocation from "./GeoLocation";
import ControllerOrganizationDB from "../ControllersDB/Collection/OrganizationDB";

// import ControllerDaDataOrganization from "../ControllersDB/Collection/DaDataOrganization";//!
// import ControllerRequisites from "../ControllersDB/Collection/Requisites";//!


import { getInitialDataRequisites } from "../../function/getInitialDataRequisites";
import { getInitialDataOrganization } from "../../function/getInitialDataOrganization";

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
    let daDataOrganization = await fetchGetDataOrganization({ query: INN.toString() });
    

    
    
    if (isError(daDataOrganization)) {
      return {
        success: daDataOrganization.error,
        message: daDataOrganization.message,
      };
    }

    daDataOrganization.dataRegistrateFormApp = dateCreate;
    dataGeo.date = dateCreate  
   
  
    const saveGeoLocation             = await ServiceGeoLocation.setDataLocation(INN.toString(),dataGeo)
    const saveInitialDataOrganization = await ControllerOrganizationDB.addDataOrganization(getInitialDataOrganization(daDataOrganization,dateCreate))
    
    const saveDaDataOrganization      = await ControllerDaDataOrganization.addDaDataOrganization(daDataOrganization, INN.toString());
   const saveInitialDataRequisites =  await ControllerRequisites.saveRequisites(getInitialDataRequisites(daDataOrganization,dateCreate))
    
    

    return saveDaDataOrganization
  } catch (error) {
    return {
      success: false,
      message: `error create new Organization , INN:${INN},error:${error}`,
    };
  }
};

const ServiceOrganization = {
  getParamsOrganization,
  updateParamsOrganization,
  createNewOrganization,
};

module.exports = ServiceOrganization;

export default ServiceOrganization;