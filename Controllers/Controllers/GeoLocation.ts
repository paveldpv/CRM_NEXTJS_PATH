import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import { TAnswerUpdateDB } from "@/Types/Types";
import { saveGeoLocation } from "../ControllersDB/Collection/GeoLocationDB";

export const setDataLocation = async (INN: string, data: TGeoLocation): Promise<TAnswerUpdateDB> => {
  try {
    return await saveGeoLocation(INN, data);
  } catch (error) {
    return {
      success: false,
      message: `error set Data location, error :${error}`,
    };
  }
};

const ControllerGeoLocation = {
  setDataLocation,
};
module.exports = ControllerGeoLocation;
export default ControllerGeoLocation;
