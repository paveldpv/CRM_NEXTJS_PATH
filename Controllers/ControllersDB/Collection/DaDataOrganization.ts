import { connect } from "mongoose";
import modelDaDataOrganization from "../SCHEMAS/SchemaOrganization/OrganizationDaDataSchema";
import { TDaDataOrganization } from "@/Types/subtypes/TDaDataOrganization";

export const addDaData = async (generalINN: string, data: Partial<TDaDataOrganization>) => {
  await connect(`${process.env.DB_URL}${generalINN}`);
  const newOrganization = new modelDaDataOrganization(data);
  await newOrganization.save();
};

const getDaDataByParams = async (
  generalINN: string,
  params: TDaDataOrganization
): Promise<TDaDataOrganization[]> => {
  await connect(`${process.env.DB_URL}${generalINN}`);
  return await modelDaDataOrganization.find(params);
};
const deleteDaData = async (generalINN: string, INNDaData: string) => {
  await connect(`${process.env.DB_URL}${generalINN}`);
  await modelDaDataOrganization.updateOne({ data: { inn: INNDaData } }, { $set: { safeDeleted: true } });
};
const getAllDaData = async (generalINN: string): Promise<TDaDataOrganization[]> => {
  await connect(`${process.env.DB_URL}${generalINN}`);
  return await modelDaDataOrganization.find({});
};
const updateDaDataOrganization = async (generalINN: string,oldData:TDaDataOrganization,newData: TDaDataOrganization) => {
  await connect(`${process.env.DB_URL}${generalINN}`);
  await modelDaDataOrganization.updateOne(oldData,newData)
};

const ControllerDaDataOrganizationDB = {
  addDaData,getDaDataByParams,deleteDaData,getAllDaData,updateDaDataOrganization
};
module.exports = ControllerDaDataOrganizationDB;
export default ControllerDaDataOrganizationDB;
