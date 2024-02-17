import { TAnswerUpdateDB, TDBUser } from "@/Types/Types";
import { connect } from "mongoose";
import modelUSer from "../SCHEMAS/usersSchema";

const addNewAdmin = async (data: TDBUser): Promise<TAnswerUpdateDB> => {
  try {
    const connectDB = await connect(`${process.env.DB_URL}${data.INN}`);
    const newAdmin = new modelUSer(data);
    await newAdmin.save();
    connectDB.connection.close();

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `error add new admin ,data user :${data},error: ${error}`,
    };
  }
};

const getUsers = async (INN: number): Promise<TDBUser[] | null> => {
  try {
    const connectDB = await connect(`${process.env.DB_URL}${INN}`);
    const dataUSer: TDBUser | TDBUser[] | null = await modelUSer.find({});
    connectDB.connection.close();
    return dataUSer;
  } catch (error) {
    return null;
  }
};

const getUserByParams = async (INN: number, user: Partial<TDBUser>): Promise<TDBUser | null> => {
  try {
    const connectDB = await connect(`${process.env.DB_URL}${INN}`);
    const dataUSer: TDBUser | null = await modelUSer.findOne(user);
    connectDB.connection.close();
    return dataUSer;
  } catch (error) {
    return null;
  }
};

const getUser = async (INN: number, idUser: string): Promise<TDBUser | null> => {
  try {
    const connectDB = await connect(`${process.env.DB_URL}${INN}`);
    const dataUSer: TDBUser | null = await modelUSer.findOne({ idUSer: idUser });
    connectDB.connection.close();
    return dataUSer;
  } catch (error) {
    return null;
  }
};

const updateDataUser = async (INN: number, data: TDBUser): Promise<TAnswerUpdateDB> => {
  try {
    const connectDB = await connect(`${process.env.DB_URL}${data.INN}`);
    const update = await modelUSer.updateOne({ idUser: data.idUser }, data);
    connectDB.connection.close();

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

const removePhotoToDB = async (INN: number, idUser: string): Promise<TAnswerUpdateDB> => {
  try {

    const connectDB = await connect(`${process.env.DB_URL}${INN}`);
    const update = await modelUSer.updateOne({ idUser: idUser }, {$set:{srcPhoto:'NOT_FOUND'}});
    connectDB.connection.close();

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `error remove photo to db error :${error}`,
    };
  }
};

const ControllerUsersDB = {
  addNewAdmin,
  getUser,
  getUserByParams,
  getUsers,
  updateDataUser,
  removePhotoToDB
};
export default ControllerUsersDB;
