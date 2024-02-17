import { TAnswerUpdateDB, TConfigAPP } from "@/Types/Types";
import ControllerConfigDB from "../ControllersDB/Collection/ConfigAppDB";
import getInitialConfigApp from "../../function/initialConfigApp";

const getConfig = async (INN: Number, idUser: string): Promise<TConfigAPP | null> => {
  try {
    try {
      const resultConfig = ControllerConfigDB.getConfig(INN, idUser);
      if (resultConfig) return resultConfig;
      return resultConfig;
    } catch (error) {
      return null;
    }
  } catch (error) {
    return null;
  }
};
const setConfig = async (INN: number, idUser: string): Promise<TAnswerUpdateDB | null> => {
  try {
    const dataConfigUser: TConfigAPP = getInitialConfigApp(idUser);
    const setConfigApp = ControllerConfigDB.setConfig(INN, dataConfigUser);
    return setConfigApp;
  } catch (error) {
    return { success: false, message: `error get config ,error - ${error}` };
  }
};

const updateConfigApp = async (
  INN: number,
  idUser: string,
  dataConfig: TConfigAPP
): Promise<TAnswerUpdateDB | null> => {
  try {
    const updateConfig = await ControllerConfigDB.updateConfigApp(INN, idUser, dataConfig);

    return updateConfig;
  } catch (error) {
    return {
      success: false,
      message: `error update config app, error :${error} error Controller - ConfigApp`,
    };
  }
};

const ControllerConfigApp = {
  setConfig,
  getConfig,
  updateConfigApp,
};

export default ControllerConfigApp;
