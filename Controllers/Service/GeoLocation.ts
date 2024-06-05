import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { TAnswerUpdateDB } from "@/Types/Types";

import ControllerGeoLocationDB from "../ControllersDB/Collection/GeoLocationDB";
import { TError } from "@/Types/subtypes/TError";

export const setDataLocation = async (INN: string, data: TGeoLocation): Promise<TAnswerUpdateDB> => {
  try {    
     await ControllerGeoLocationDB.saveGeoLocation(INN,data)
    return {
      success:true
    }

  } catch (error) {
    return {
      success: false,
      message: `error set Data location, error :${error}`,
    };
  }
};
export const getDataLocation =async(INN:string):Promise<TGeoLocation[]|TError> =>{
  try {
    return await ControllerGeoLocationDB.getAllGeoLocation(INN)
    
  } catch (error) {
    return {
      error:true,message:`error get data location , error :${error}`
    }
  }
}

const ServiceGeoLocation = {
  setDataLocation,getDataLocation
};
module.exports = ServiceGeoLocation;
export default ServiceGeoLocation;
