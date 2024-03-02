import { TAnswerUpdateDB, TDataOrganization } from "@/Types/Types";
import moment from "moment";
import ControllerOrganizationDB from "../ControllersDB/Collection/OrganizationDB";

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
export const createNewOrganization = async (INN: number, idAdministrator: string): Promise<TAnswerUpdateDB> => {
  try {
    const dataNewOrganization: Pick<TDataOrganization, "INN" | "dateRegistration" > = {
      INN,      
      dateRegistration: moment().toDate(),
    };
    return await ControllerOrganizationDB.createNewOrganization(dataNewOrganization)
    
  } catch (error) {
    return {
      success: false,
      message: `error create new Organization , INN:${INN},error:${error}`,
    };
  }
};

const ControllerOrganization = {
  getParamsOrganization,
  updateParamsOrganization,
  createNewOrganization,
  
};

module.exports = ControllerOrganization;

export default ControllerOrganization;
