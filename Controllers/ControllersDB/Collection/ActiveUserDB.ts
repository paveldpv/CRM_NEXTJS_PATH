import ContextOrganization from "../../classes/contextOrganization";


export default class ControllerDBActiveUser extends ContextOrganization{
   private idUser:string

   constructor(INN:string,idUser:string){
      super(INN)
      this.idUser=idUser

   }

   public static async checkUsersOnActive(){

   }
   public async addActiveUser(){

   }
   public async removeActiveUser(){

   }
   public async getAllActiveUser(){

   }


}
