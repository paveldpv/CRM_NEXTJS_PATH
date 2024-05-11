import { connect } from "mongoose";
import { TAnswerUpdateDB } from "@/Types/Types";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import modelGeoLocation from "../SCHEMAS/geoLocationSchema";


export const saveGeoLocation=async(INN:string,data:TGeoLocation):Promise<TAnswerUpdateDB> => {

   console.log("🚀 ~ saveGeoLocation ~ data:", data)
   
   await connect(`${process.env.DB_URL}${INN}`)
   const resultSaveGeoLocation = new  modelGeoLocation(data)
   await resultSaveGeoLocation.save()
   return{
      success:true
   }


}

const ControllerGeoLocationDB = {
   saveGeoLocation
}
module.exports = ControllerGeoLocationDB

export default ControllerGeoLocationDB