import { connect } from "mongoose";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";
import modelGeoLocation from "../SCHEMAS/geoLocationSchema";

export const saveGeoLocation = async (INN: string, data: TGeoLocation) => {
  await connect(`${process.env.DB_URL}${INN}`);
  const resultSaveGeoLocation = new modelGeoLocation(data);
  await resultSaveGeoLocation.save();
};
export const getAllGeoLocation = async (INN: string): Promise<TGeoLocation[]> => {
  await connect(`${process.env.DB_URL}${INN}`);
  return await modelGeoLocation.find({});
};
export const getDataLocationGivenRange = async (INN: string, range: number) => {
  await connect(`${process.env.DB_URL}${INN}`);
  return await modelGeoLocation.find({}).skip(range-5).limit(5)
 
};

const ControllerGeoLocationDB = {
  saveGeoLocation,
  getAllGeoLocation,
  getDataLocationGivenRange
};
module.exports = ControllerGeoLocationDB;

export default ControllerGeoLocationDB;
