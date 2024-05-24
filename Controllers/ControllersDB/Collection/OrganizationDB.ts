import { TAnswerUpdateDB } from "@/Types/Types";
import { TDataOrganization } from "@/Types/subtypes/TOrganization";
import { connect } from "mongoose";

import modelOrganization from "../SCHEMAS/SchemaOrganization/OrganizationSchema";

export const getParamsOrganization = async (INN: number): Promise<TDataOrganization | undefined> => {
  await connect(`${process.env.DB_URL}${INN}`);
  const data = await modelOrganization.findOne({ INN: INN });

  return JSON.parse(JSON.stringify(data));
};

export const updateParamsOrganization = async (data: TDataOrganization): Promise<TAnswerUpdateDB> => {
  await connect(`${process.env.DB_URL}${data.INN}`);
  const updateParamsOrganization = await modelOrganization.findOneAndUpdate({ INNN: data.INN }, data);

  return { success: true };
};

export const addDataOrganization = async (
  data: TDataOrganization | Partial<TDataOrganization>
): Promise<TAnswerUpdateDB> => {
  await connect(`${process.env.DB_URL}${data.INN}`);
  const newOrganization = new modelOrganization(data);
  await newOrganization.save();
  return {
    success: true,
  };
};

const ControllerOrganizationDB = {
  getParamsOrganization,
  updateParamsOrganization,
  addDataOrganization,
};
module.exports = ControllerOrganizationDB;
export default ControllerOrganizationDB;
