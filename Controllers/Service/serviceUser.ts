import { TError } from "@/Types/subtypes/TError"
import { TDBUser } from "@/Types/Types"
// import { fetchDeletedFiles } from "../../service/Server/FileManager/deletedFile"
import { Service } from "../classes/Service"
import ControllerDBUser from "../ControllersDB/Collection/UsersDB"

export class ServiceUsers extends Service {
  constructor(INN: string) {
    super(INN);
  }

  public async getInfoAdmin(): Promise<TDBUser[] | TError> {
    try {
      const admins = await new ControllerDBUser(this.INN).getAdmins();
      return this.normalizeDataFromMongoDB(admins);
    } catch (error) {
      const er: TError = {
        error: true,
        message: `error get info admin, INN :${this.INN} , error :${error}`,
      };
      this.logError(er);
      return er;
    }
  }

  public async getUserById(idUser: string): Promise<TDBUser | TError> {
    try {
      const datUser = await new ControllerDBUser(this.INN).getUserByID(idUser);
      if (datUser === null) {
        const er = {
          error: true,
          message: `data user is null ,bad id ${idUser}`,
        };
        this.logError(er);
        return er;
      }

      return this.normalizeDataFromMongoDB(datUser);
    } catch (error) {
      const er = {
        error: true,
        message: `error add new admin, INN :${this.INN} , error :${error},query :${idUser}`,
      };
      this.logError(er);
      return er;
    }
  }

  public async addNewUser(data: TDBUser): Promise<void | TError> {
    try {
      await new ControllerDBUser(this.INN).addNewUser(data);
    } catch (error) {
      const er: TError = {
        error: true,
        message: `error add new admin, INN :${this.INN} , error :${error} , query :${data}`,
      };
      this.logError(er);
      return er;
    }
  }
  public async getUsersByGroupID(listID: string[]): Promise<TDBUser[] | TError> {
    try {
      const groupUsers = await new ControllerDBUser(this.INN).getUsersByGroupID(listID);

      return this.normalizeDataFromMongoDB(groupUsers);
    } catch (error) {
      const er: TError = {
        error: true,
        message: `error add get users by group ID, INN :${this.INN} , error :${error} ,query ${listID}`,
      };
      this.logError(er);
      return er;
    }
  }

  // public async deletedPhotoUser(idUser: string, fullPathPhoto: string): Promise<void | TError> {
  //   try {
  //     await new ControllerDBUser(this.INN).deletedPhotToDB(idUser);
  //     const deletedPhotoFromServer = await fetchDeletedFiles([fullPathPhoto]);
  //     if (deletedPhotoFromServer && deletedPhotoFromServer[0].Errored) {
  //       console.log(`deleted photo success ,id user ${idUser}`);
  //     } else {
  //       const er: TError = {
  //         error: true,
  //         message: `errored photo success ,id user ${idUser},data response serve :${deletedPhotoFromServer}`,
  //       };
  //       this.logError(er);
  //     }
  //   } catch (error) {
  //     const er: TError = {
  //       error: true,
  //       message: `error deleted Photo user, INN :${this.INN} , error :${error} query ${idUser} /n ${fullPathPhoto}`,
  //     };
  //     this.logError(er);
  //     return er;
  //   }
  // }

  public async updateDataUser(updateDataUser: TDBUser): Promise<void | TError> {
    try {
      await new ControllerDBUser(this.INN).updateDataUser(updateDataUser);
    } catch (error) {
      const er: TError = {
        error: true,
        message: `error updateData user , error :${error},query :${updateDataUser}`,
      };
      this.logError(er);
      return er;
    }
  }

  public async getUserByPhone (phone:string):Promise<TDBUser|null|TError>{
    try {
      const controllerUser = new ControllerDBUser(this.INN)
      const dataUser =await controllerUser.getUsersByParams({phone:phone})
      return this.normalizeDataFromMongoDB(dataUser)
      
    } catch (error) {
      const er:TError={
        error:true,message:`error get user by phone , phone ${phone},error ${error}`
      }
      this.logError(er)
      return er
    }
  }
}
