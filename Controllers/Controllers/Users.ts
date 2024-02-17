import { TDBUser, TAnswerUpdateDB } from "@/Types/Types";
import ControllerUsersDB from "../ControllersDB/Collection/UsersDB";
import { fetchDeletedFiles } from "../../service/Server/fetchServer";
import { SERVER_DOTNET } from "../../config/config";

const getUser = async (INN: number, idUser: string): Promise<TDBUser | null> => {
  const result = await ControllerUsersDB.getUser(INN, idUser);
  return result;
};
const addNewAdmin = async (data: TDBUser): Promise<TAnswerUpdateDB> => {
  const result = await ControllerUsersDB.addNewAdmin(data);
  return result;
};
const getUsers = async (INN: number): Promise<TDBUser[] | null> => {
  const result = await ControllerUsersDB.getUsers(INN);
  return result;
};
const getUserByParams = async (INN: number, user: Partial<TDBUser>): Promise<TDBUser | null> => {
  const result = await ControllerUsersDB.getUserByParams(INN, user);
  return result;
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

const deletePhoto = async (
  INN: number,
  idUser: string,
  fullPath: string
): Promise<TAnswerUpdateDB> => {
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
