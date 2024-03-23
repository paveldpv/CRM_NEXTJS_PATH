import { connect } from "mongoose";
import modelConfig from "../SCHEMAS/configAppSchema";
import { TAnswerUpdateDB, } from "@/Types/Types";
import { TConfigAPP } from "@/Types/subtypes/TAppearanceConfigApp";

const getConfig = async (INN: Number, idUser: string): Promise<TConfigAPP | null> => {
  try {
    const connectDB = await connect(`${process.env.DB_URL}${INN}`);
    const resultConfig = (await modelConfig.findOne({ idUser: idUser })) as TConfigAPP;
    //await connectDB.connection.close();
    return JSON.parse(JSON.stringify(resultConfig));
  } catch (error) {
    return null;
  }
};

const setConfig = async (INN: number, data: TConfigAPP): Promise<TAnswerUpdateDB> => {
  try {
    const connectDB = await connect(`${process.env.DB_URL}${INN}`);
    const dataConfig = new modelConfig(data);
    await dataConfig.save();
   // await connectDB.connection.close();
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `error set config ,INN organization  :${INN} , error :${error}`,
    };
  }
};

const updateConfigApp = async (INN: number, idUser: string, dataConfig: TConfigAPP): Promise<TAnswerUpdateDB> => {
  try {
    const connectDB = await connect(`${process.env.DB_URL}${INN}`);
    const updateConfig = await modelConfig.updateOne({ idUser: idUser }, dataConfig);    
    //connectDB.connection.close()
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `error update config app ,error ${error},error Controller DB - ConfigDB`,
    };
  }
};

const ControllerConfigDB = {
  getConfig,
  setConfig,
  updateConfigApp,
};
export default ControllerConfigDB;
