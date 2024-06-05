import { connect } from "mongoose";
import { TAnswerUpdateDB } from "@/Types/Types";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import modelGeoLocation from "../SCHEMAS/geoLocationSchema";


export const saveGeoLocation=async(INN:string,data:TGeoLocation) => {   
   
   await connect(`${process.env.DB_URL}${INN}`)
   const resultSaveGeoLocation = new  modelGeoLocation(data)
   await resultSaveGeoLocation.save()
   
}
export const getAllGeoLocation = async(INN:string):Promise<TGeoLocation[]>=>{
   await connect(`${process.env.DB_URL}${INN}`)
   return await modelGeoLocation.find({})
}


const ControllerGeoLocationDB = {
   saveGeoLocation,getAllGeoLocation
}
module.exports = ControllerGeoLocationDB

export default ControllerGeoLocationDB