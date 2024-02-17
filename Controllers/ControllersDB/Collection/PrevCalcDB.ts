import { connect } from "mongoose";
import modelPrevCalc from "../SCHEMAS/PrevCalcSchema";
import { TAnswerUpdateDB, TRequestPrevCalc } from "@/Types/Types";

const saveRequest = async (INN: number, dataPrevCalc: TRequestPrevCalc): Promise<TAnswerUpdateDB> => {
  
  
  const connectDB = await connect(`${process.env.DB_URL}${INN}`);
  
  
  const prevRequest = new modelPrevCalc(dataPrevCalc);
  await prevRequest.save();
  connectDB.connection.close();
  return {
    success: true,
  };
};

const deleteRequest = async (INN: number, idRequest: string): Promise<TAnswerUpdateDB> => {
  const connectDB = await connect(`${process.env.DB_URL}${INN}`);
  const safeDelete = await modelPrevCalc.findOneAndUpdate({ idRequest: idRequest }, { safeDelete: false });
  connectDB.connection.close();
  return {
    success: true,
  };
};
const getAllRequest = async (INN: number): Promise<TRequestPrevCalc[] | []> => {
  const connectDB = await connect(`${process.env.DB_URL}${INN}`);
  const dataAllRequest = await modelPrevCalc.find();
  connectDB.connection.close();
  return dataAllRequest;
};

const getFavoriteRequest = async (INN: number): Promise<TRequestPrevCalc[] | []> => {
  const connectDB = await connect(`${process.env.DB_URL}${INN}`);
  const dataFavoritesRequest = await modelPrevCalc.find({ favorites: true });
  connectDB.connection.close();
  return dataFavoritesRequest;
};

const setFavoriteRequest = async (
  INN: number,
  idRequest: string,
  isFavorite: boolean
): Promise<TAnswerUpdateDB> => {
  const connectDB = await connect(`${process.env.DB_URL}${INN}`);
  const updateRequest = await modelPrevCalc.findOneAndUpdate({ idRequest: idRequest }, { favorites: isFavorite });
  connectDB.connection.close();
  return {
    success: true,
  };
};

const ControllerPrevCalDB = {
  saveRequest,
  deleteRequest,
  getAllRequest,
  setFavoriteRequest,
  getFavoriteRequest,
};
module.exports = ControllerPrevCalDB;
export default ControllerPrevCalDB;
