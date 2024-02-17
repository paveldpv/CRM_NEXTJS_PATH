import { TAnswerUpdateDB, TDataOrganization } from "@/Types/Types";
import { connect } from "mongoose";

import modelOrganization from "../SCHEMAS/SchemaOrganization/OrganizationSchema";

export const getParamsOrganization = async (INN: number): Promise<TDataOrganization|null> => {
  const connectDB = await connect(`${process.env.DB_URL}${INN}`);
  const data = await modelOrganization.findOne({ INN: INN });
  await connectDB.connection.close();
  return data;
};
export const updateParamsOrganization = async (
  data: TDataOrganization
): Promise<TAnswerUpdateDB> => {
  const connectDB = await connect(`${process.env.DB_URL}${data.INN}`);
  const updateParamsOrganization = await modelOrganization.findOneAndUpdate(
    { INNN: data.INN },
    data
  );
  await connectDB.connection.close();
  return { success: true };
};



const ControllerOrganizationDB = {
   getParamsOrganization,updateParamsOrganization
};
module.exports = ControllerOrganizationDB;
export default ControllerOrganizationDB;
