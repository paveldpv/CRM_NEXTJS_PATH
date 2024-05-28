import modelRequisites from "../SCHEMAS/SchemaOrganization/RequisitesSchema";
import { TRequisites } from "@/Types/subtypes/TRequisites";
import { connect } from "mongoose";

export const addRequisites = async (generalINN: string, data: Partial<TRequisites>) => {
  await connect(`${process.env.DB_URL}${generalINN}`);  
  const newRequisites = new modelRequisites(data);
  await newRequisites.save();
};
export const updateRequisites = async (generalINN: string, data: Partial<TRequisites>) => {
  await connect(`${process.env.DB_URL}${generalINN}`);
  const updateRequisites = await modelRequisites.updateOne({ INN: data.INN }, data);
};
export const deleteRequisites = async (generalINN: string, INN: string) => {
  await connect(`${process.env.DB_URL}${generalINN}`);
  const safeDeleted = await modelRequisites.updateOne(
    { INN: INN },
    {
      $set: {
        safeDeleted: true,
      },
    }
  );
};
export const getRequisitesByParams = async (generalINN: string, params: TRequisites): Promise<TRequisites[]> => {
    await connect(`${process.env.DB_URL}${generalINN}`);
    return await modelRequisites.find(params)
};
export const getAllRequisites = async (generalINN: string): Promise<TRequisites[]> => {
    await connect(`${process.env.DB_URL}${generalINN}`);
    return await modelRequisites.find({})
};

const ControllerRequisitesDB = {
  addRequisites,
  updateRequisites,
  deleteRequisites,
  getRequisitesByParams,
  getAllRequisites,
};
module.exports = ControllerRequisitesDB;
export default ControllerRequisitesDB;
