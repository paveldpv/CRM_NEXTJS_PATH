// import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
// import { TAnswerUpdateDB } from "@/Types/Types";
// import { normalizeMongoData } from "../../function/normalizeMongoData";

// import ControllerGeoLocationDB from "../ControllersDB/Collection/GeoLocationDB";
// import { TError } from "@/Types/subtypes/TError";

// export const setDataLocation = async (INN: string, data: TGeoLocation): Promise<TAnswerUpdateDB> => {
//   try {    
//      await ControllerGeoLocationDB.saveGeoLocation(INN,data)
//     return {
//       success:true
//     }

//   } catch (error) {
//     return {
//       success: false,
//       message: `error set Data location, error :${error}`,
//     };
//   }
// };
// export const getDataLocation =async(INN:string,range?:number):Promise<TGeoLocation[]|TError> =>{
//   try {
//     if(range){
//       const data = normalizeMongoData(await ControllerGeoLocationDB.getDataLocationGivenRange(INN,range))
//       return data
//     }
//     const data = normalizeMongoData(await ControllerGeoLocationDB.getAllGeoLocation(INN))
//     return data
    
//   } catch (error) {
//     return {
//       error:true,message:`error get data location , error :${error}`
//     }
//   }
// }

// const ServiceGeoLocation = {
//   setDataLocation,getDataLocation
// };
// module.exports = ServiceGeoLocation;
// export default ServiceGeoLocation;


