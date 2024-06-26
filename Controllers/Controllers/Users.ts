import { TDBUser, TAnswerUpdateDB } from "@/Types/Types";
import ControllerUsersDB from "../ControllersDB/Collection/UsersDB";
import { fetchDeletedFiles } from "../../service/Server/fetchServer";

/**
 *  get users for id , id this array string
 */

const getUser = async (INN: number, idUser: string): Promise<TDBUser | null> => {
  try {
    const result = await ControllerUsersDB.getUser(INN, idUser);
    return result;
  } catch (error) {
    return null;
  }
};

/**
 *  add new admin ,used for registration new organization
 */
const addNewAdmin = async (data: TDBUser): Promise<TAnswerUpdateDB> => {
  try {
    const result = await ControllerUsersDB.addNewAdmin(data);
    return result;
  } catch (error) {
    console.error(`error add new admin,data user : ${data},error :${error}`);
    return {
      success: false,
      message: `error add new admin,data user : ${data},error :${error}`,
    };
  }
};

/**
 *  return users in one organization given INN
 */
const getUsers = async (INN: number): Promise<TDBUser[] | null> => {
  try {
    const result = await ControllerUsersDB.getUsers(INN);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(`error get userS , error :${error}`);

    return null;
  }
};

/**
 *  return one user for given params
 */
const getUserByParams = async (INN: number, user: Partial<TDBUser>): Promise<TDBUser | null> => {
  try {
    const result = await ControllerUsersDB.getUserByParams(INN, user);
    return result;
  } catch (error) {
    console.log(`error get user by params ,error:${error}`);
    return null;
  }
};

const updateDataUser = async (INN: number, user: TDBUser): Promise<TAnswerUpdateDB> => {
  try {
    return await ControllerUsersDB.updateDataUser(INN, user);
  } catch (error) {
    console.log(`error update user , error :${error}`);
    return {
      success: false,
      message: `error update user,error :${error}`,
    };
  }
};

const deletePhoto = async (INN: number, idUser: string, fullPath: string): Promise<TAnswerUpdateDB> => {
  try {
    const removePhotoToDB = await ControllerUsersDB.removePhotoToDB(INN, idUser);

    const deletedFile = await fetchDeletedFiles([fullPath]);
    if (deletedFile && deletedFile[0].Errored) {
      console.log("deleted file success");
    } else {
      console.log("errored deleted file");
    }

    if (removePhotoToDB) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: "error deleted file to BD",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `error delete phot .error :${error}`,
    };
  }
};

const ControllerUsers = {
  getUser,
  addNewAdmin,
  getUsers,
  getUserByParams,
  updateDataUser,
  deletePhoto,
}; 
export default ControllerUsers;
