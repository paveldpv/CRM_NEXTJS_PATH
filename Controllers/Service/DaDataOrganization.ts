import { TDaDataOrganization } from "@/Types/subtypes/TDaDataOrganization";
import { TError } from "@/Types/subtypes/TError";
import { TAnswerUpdateDB } from "@/Types/Types";
import ControllerDaDataOrganizationDB from "../ControllersDB/Collection/DaDataOrganization";
import { TQueryGetDaDataOrganization } from "@/Types/subtypes/TQueryGetDaDataOrganization";
import { fetchGetDataOrganization } from "../../service/DaData/getDataOrganization";
import { isError } from "../../function/IsError";


/**
 * 
 * if not set query params than will be request params {query:generalINN}
 * 
 * @param generalINN 
 * @param query 
 * @returns 
 */
const addDaData = async (generalINN: string, query?:TQueryGetDaDataOrganization,data?:TDaDataOrganization): Promise<TAnswerUpdateDB> => {
  try {
    if(data){
      await ControllerDaDataOrganizationDB.addDaData(generalINN,data)
      return {
        success:true
      }
    }


    if(query){
      const daDataOrganization = await fetchGetDataOrganization(query);
      if(isError(daDataOrganization)){
        return{
          success:false,
          message:`error get fetch daData ,error :${daDataOrganization.error},query params : ${query}`
        }
      }

      await ControllerDaDataOrganizationDB.addDaData(generalINN,daDataOrganization)
    }


    const daDataOrganization = await fetchGetDataOrganization({ query: generalINN });
    if(isError(daDataOrganization)){
      return{
        success:false,
        message:`error get fetch daData ,error :${daDataOrganization.error},INN organization :${generalINN}`
      }
    }

    await ControllerDaDataOrganizationDB.addDaData(generalINN,daDataOrganization)
     
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `error add daData, error :${error}`,
    };
  }
};


const getDaData = async (generalINN: string, params: TDaDataOrganization): Promise<TDaDataOrganization[] | TError> => {
  try {
    return await ControllerDaDataOrganizationDB.getDaDataByParams(generalINN,params)
  } catch (error) {
   return{
      error:true,
      message:`error get daData ,error :${error}`
   }
  }
};
const deleteDaData = async (generalINN: string, INN: string): Promise<TAnswerUpdateDB> => {
   try {
    await ControllerDaDataOrganizationDB.deleteDaData(generalINN,INN)
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: `error deleted daData, error :${error}`,
      };
    }
};

const updateDaData = async(generalINN:string,oldData:TDaDataOrganization,newData:TDaDataOrganization):Promise<TAnswerUpdateDB>=>{
  try {
      await ControllerDaDataOrganizationDB.updateDaDataOrganization(generalINN,oldData,newData)
      return {
        success:true
      }
  } catch (error) {
    return {
      success:false,message:`error update daData , general INN :${generalINN} old data :${oldData} new data ${newData}`
    }
  }
}
const ServiceDaDataOrganization = {
  addDaData,
  getDaData,
  deleteDaData,
};
module.exports = ServiceDaDataOrganization;

export default ServiceDaDataOrganization;
