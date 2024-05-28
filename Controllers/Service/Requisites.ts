import { TError } from "@/Types/subtypes/TError";
import { TRequisites } from "@/Types/subtypes/TRequisites";
import { TAnswerUpdateDB } from "@/Types/Types";
import ControllerRequisitesDB from "../ControllersDB/Collection/Requisites";

const addRequisites = async (generalINN: string, data: Partial<TRequisites>): Promise<TAnswerUpdateDB> => {
  try {   
    
    await ControllerRequisitesDB.addRequisites(generalINN, data);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `error ADD REQUISITES ,error = ${error} , genera INN :${generalINN} ,data : ${data}`,
    };
  }
};
const updateRequisites = async (generalINN: string, data: Partial<TRequisites>): Promise<TAnswerUpdateDB> => {
  try {
    await ControllerRequisitesDB.updateRequisites(generalINN, data);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `error UPDATE REQUISITES ,error = ${error} , general INN :${generalINN} ,data : ${data}`,
    };
  }
};
const deleteRequisites = async (generalINN: string, INN: string): Promise<TAnswerUpdateDB> => {
  try {
    await ControllerRequisitesDB.deleteRequisites(generalINN, INN);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `error DELETED REQUISITES ,error = ${error} , general INN :${generalINN} ,INN : ${INN}`,
    };
  }
};
const getAllRequisites = async (generalINN: string): Promise<TRequisites[] | TError> => {
  try {
    return await ControllerRequisitesDB.getAllRequisites(generalINN);
  } catch (error) {
    return { error: true, message: `error GET_ALL REQUISITES ,error = ${error} , general INN :${generalINN} ` };
  }
};
const getRequisites = async (generalINN: string, params: TRequisites): Promise<TRequisites[] | TError> => {
  try {
    return await ControllerRequisitesDB.getRequisitesByParams(generalINN, params);
  } catch (error) {
    return {
      error: true,
      message: `error GET REQUISITES ,error = ${error} , params : ${params}  general INN :${generalINN}`,
    };
  }
};

const ServiceRequisites = {
  addRequisites,
  updateRequisites,
  deleteRequisites,
  getAllRequisites,
  getRequisites,
};
module.exports = ServiceRequisites;

export default ServiceRequisites;
