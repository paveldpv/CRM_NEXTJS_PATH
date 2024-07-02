import { TAnswerUpdateDB, TDBUser } from "@/Types/Types";
import { connect } from "mongoose";
import modelUSer from "../SCHEMAS/usersSchema";

const addNewAdmin = async (data: TDBUser): Promise<TAnswerUpdateDB> => {
  try {
    await connect(`${process.env.DB_URL}${data.INN}`);
    const newAdmin = new modelUSer(data);
    await newAdmin.save();
    // connectDB.connection.close();

    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

const getUsers = async (INN: string): Promise<TDBUser[] | null> => {
  try {
    const connectDB = await connect(`${process.env.DB_URL}${INN}`);
    const dataUSer = await modelUSer.find({},{safeDeleted:false});

    // connectDB.connection.close();
    return dataUSer;
  } catch (error) {
    throw error;
  }
};

const getUserByParams = async (INN: string, user: Partial<TDBUser>): Promise<TDBUser | null> => {
  try {
    await connect(`${process.env.DB_URL}${INN}`);
    const dataUSer: TDBUser | null = await modelUSer.findOne(user);

    return dataUSer;
  } catch (error) {
    throw error;
  }
};

const getUser = async (INN: string, idUser: string): Promise<TDBUser | null> => {
  try {
    await connect(`${process.env.DB_URL}${INN}`);
    const dataUSer: TDBUser | null = await modelUSer.findOne({ idUSer: idUser });
    // connectDB.connection.close();
    return dataUSer;
  } catch (error) {
    throw error;
  }
};

const updateDataUser = async (INN: string, data: TDBUser): Promise<TAnswerUpdateDB> => {
  try {
    await connect(`${process.env.DB_URL}${data.INN}`);
    const update = await modelUSer.updateOne({ idUser: data.idUser }, data);
    //connectDB.connection.close();

    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

const removePhotoToDB = async (INN: string, idUser: string): Promise<TAnswerUpdateDB> => {
  try {
    await connect(`${process.env.DB_URL}${INN}`);
    const update = await modelUSer.updateOne({ idUser: idUser }, { $set: { srcPhoto: "NOT_FOUND" } });
    //connectDB.connection.close();

    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};
const getUsersByListID = async(INN:string,listID:string[]) =>{
  await connect(`${process.env.DB_URL}${INN}`);
  return JSON.parse(JSON.stringify(await modelUSer.find({idUser:{$in:listID}})))

}


const ControllerUsersDB = {
  addNewAdmin,
  getUser,
  getUserByParams,
  getUsers,
  updateDataUser,
  removePhotoToDB,
  getUsersByListID
};
export default ControllerUsersDB;
