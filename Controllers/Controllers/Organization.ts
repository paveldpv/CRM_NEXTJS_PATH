import { TAnswerUpdateDB, TDataOrganization } from "@/Types/Types";
import ControllerOrganizationDB from "../ControllersDB/Collection/OrganizationDB";

export const getParamsOrganization = async (INN: number): Promise<TDataOrganization | undefined|null> => {
  try {
    return await ControllerOrganizationDB.getParamsOrganization(INN);
  } catch (error) {
    console.log(`error get params organization ,INN :${INN},error :${error}`);
    return undefined;
  }
};
export const updateParamsOrganization = async (
  data: TDataOrganization
): Promise<TAnswerUpdateDB> => {
  try {
    return await ControllerOrganizationDB.updateParamsOrganization(data);
  } catch (error) {
    return {
      success: false,
      message: `error update params organization , data update :${data},/n error:${error}`,
    };
  }
};

const ControllerOrganization = {
  getParamsOrganization,updateParamsOrganization
};

module.exports = ControllerOrganization;

export default ControllerOrganization;
