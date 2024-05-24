
import { TAnswerUpdateDB } from "@/Types/Types";
import { connect } from "mongoose";
import modelDaDataOrganization from "../SCHEMAS/SchemaOrganization/OrganizationDaDataSchema";
import { TDaDataOrganization } from "@/Types/subtypes/TDaDataOrganization";

export const addDaData = async (
  INN: string,
  data: TDaDataOrganization
): Promise<TAnswerUpdateDB> => {
  await connect(`${process.env.DB_URL}${INN}`);
  const newOrganization = new modelDaDataOrganization(data);
  await newOrganization.save();

  return {
    success: true,
  };
};

const getDaData = async(GeneralINN:string,INN:string)=>{

}
const deleteDaData = async(GeneralINN:string,INN:string) =>{

}

const ControllerDaDataOrganizationDB = {
  addDaData,getDaData,deleteDaData
};
module.exports = ControllerDaDataOrganizationDB;
export default ControllerDaDataOrganizationDB;
