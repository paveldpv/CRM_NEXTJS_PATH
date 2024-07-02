import { TError } from "@/Types/subtypes/TError";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import ControllerGeoLocationDB from "../ControllersDB/Collection/GeoLocationDB";
import { normalizeMongoData } from "../../function/normalizeMongoData";
import { TAnswerUpdateDB } from "@/Types/Types";

export class ServiceGeoLocation {
  private INN: string;

  constructor(INN: string) {
    this.INN = INN;
  }

  async getDataLocation(): Promise<TGeoLocation[] | TError>;
  async getDataLocation(range: number): Promise<TGeoLocation[] | TError>;

  async getDataLocation(range?: number): Promise<TGeoLocation[] | TError> {
    try {
      if (range) {
        const data = await ControllerGeoLocationDB.getDataLocationGivenRange(this.INN, range);
        return normalizeMongoData(data);
      }
      const data = normalizeMongoData(await ControllerGeoLocationDB.getAllGeoLocation(this.INN));
      return data;
    } catch (error) {
      return {
        error: true,
        message: `error get data location , error :${error}`,
      };
    }
  }


  async setDataLocation(data:TGeoLocation):Promise<TAnswerUpdateDB>{
   try {    
      await ControllerGeoLocationDB.saveGeoLocation(this.INN,data)
     return {
       success:true
     }
 
   } catch (error) {
     return {
       success: false,
       message: `error set Data location, error :${error}`,
     };
   }
  }
}
