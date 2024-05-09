import { connect } from "mongoose";
import { TAnswerUpdateDB } from "@/Types/Types";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import modelGeoLocation from "../SCHEMAS/geoLocationSchema";


export const saveGeoLocation=async(INN:string,data:TGeoLocation):Promise<TAnswerUpdateDB> => {
   await connect(`${process.env.DB_URL}${INN}`)
   const resultSaveGeoLocation = new  modelGeoLocation(data)
   await resultSaveGeoLocation.save()
   return{
      success:true
   }


}

const ControllerGeoLocation = {
   saveGeoLocation
}
module.exports = ControllerGeoLocation

export default ControllerGeoLocation