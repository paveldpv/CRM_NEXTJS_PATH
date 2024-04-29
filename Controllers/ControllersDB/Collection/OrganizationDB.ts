import { TAnswerUpdateDB } from "@/Types/Types";
import { TDaDataOrganization, TDataOrganization } from "@/Types/subtypes/TOrganization";
import { connect } from "mongoose";

import modelOrganization from "../SCHEMAS/SchemaOrganization/OrganizationSchema";

export const getParamsOrganization = async (INN: number): Promise<TDataOrganization | undefined> => {
  const connectDB = await connect(`${process.env.DB_URL}${INN}`);
  const data = await modelOrganization.findOne({ INN: INN });
  // await connectDB.connection.close();
  return JSON.parse(JSON.stringify(data));
};
export const updateParamsOrganization = async (data: TDataOrganization): Promise<TAnswerUpdateDB> => {
  const connectDB = await connect(`${process.env.DB_URL}${data.INN}`);
  const updateParamsOrganization = await modelOrganization.findOneAndUpdate({ INNN: data.INN }, data);
  //await connectDB.connection.close();
  return { success: true };
};

export const createNewOrganization = async ( data: TDaDataOrganization,INN:string): Promise<TAnswerUpdateDB> => {

  
  
  const connectDB = await connect(`${process.env.DB_URL}${INN}`);
  const newOrganization = new modelOrganization(data);
  await newOrganization.save();
  
  return {
    success: true,
  };
};

const ControllerOrganizationDB = {
  getParamsOrganization,
  updateParamsOrganization,
  createNewOrganization,
};
module.exports = ControllerOrganizationDB;
export default ControllerOrganizationDB;
