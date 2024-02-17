import { TAnswerUpdateDB, TRequestPrevCalc } from "@/Types/Types";

import ControllerPrevCalDB from "../ControllersDB/Collection/PrevCalcDB";

import moment from "moment";
import uniqid from "uniqid";

const saveRequest = async (INN: number, data: TRequestPrevCalc): Promise<TAnswerUpdateDB> => {
  try {
    const _moment = moment();
    const currentDate = _moment.toDate();
    data.dateRequest = currentDate; //создаем дату принятия заявки
    data.idRequest = uniqid(_moment.format("MM YY")); // ID

    return await ControllerPrevCalDB.saveRequest(INN, data as TRequestPrevCalc);
  } catch (error) {
    return {
      success: false,
      message: `error save request prev calc,error :${error}`,
    };
  }
};

const deleteRequest = async (INN: number, idRequest: string): Promise<TAnswerUpdateDB> => {
  try {
    return await ControllerPrevCalDB.deleteRequest(INN, idRequest);
  } catch (error) {
    return {
      success: false,
      message: `error deleted request , INN :${INN},idRequest  :${idRequest},error : ${error}`,
    };
  }
};
const getAllRequest = async (INN: number): Promise<TRequestPrevCalc[] | []> => {
  try {
    return await ControllerPrevCalDB.getAllRequest(INN);
  } catch (error) {
    console.log(`error get all request, INN :${INN}, error :${error}`);

    return [];
  }
};
const getFavoriteRequest = async (INN: number): Promise<TRequestPrevCalc[] | []> => {
  try {
    return await ControllerPrevCalDB.getFavoriteRequest(INN);
  } catch (error) {
    console.log(`error  get favorite request, INN :${INN},error: ${error}`);

    return [];
  }
};
const setFavoriteRequest = async (
  INN: number,
  idRequest: string,
  isFavorite: boolean
): Promise<TAnswerUpdateDB> => {
  try {
    return await ControllerPrevCalDB.setFavoriteRequest(INN, idRequest, isFavorite);
  } catch (error) {
    return {
      success: false,
      message: `error set favorite ,set favorite :${isFavorite}, INN :${INN},idRequest : ${idRequest}`,
    };
  }
};

const ControllerPrevCalc = {
  saveRequest,
  deleteRequest,
  getAllRequest,
  getFavoriteRequest,
  setFavoriteRequest,
};

export default ControllerPrevCalc;
