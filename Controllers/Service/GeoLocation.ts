import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { TAnswerUpdateDB } from "@/Types/Types";

import ControllerGeoLocationDB from "../ControllersDB/Collection/GeoLocationDB";

export const setDataLocation = async (INN: string, data: TGeoLocation): Promise<TAnswerUpdateDB> => {
  try {    
    return await ControllerGeoLocationDB.saveGeoLocation(INN,data)
  } catch (error) {
    return {
      success: false,
      message: `error set Data location, error :${error}`,
    };
  }
};

const ServiceGeoLocation = {
  setDataLocation,
};
module.exports = ServiceGeoLocation;
export default ServiceGeoLocation;
