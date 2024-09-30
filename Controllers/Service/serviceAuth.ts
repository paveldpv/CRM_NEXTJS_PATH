import { TDBUser, TFormLogin } from "@/Types/Types";


import { ServiceUsers } from './serviceUser';
import bcrypt from "bcrypt";
import { isError } from '../../function/IsError'
import { Service } from '../classes/Service'
import { TError } from '@/Types/subtypes/TError'

export class ServiceAuth extends Service{
  private phone :string;
  private password :string;
  constructor(dataFormLogin:TFormLogin){
    super(dataFormLogin.INN)
    this.phone = dataFormLogin.phone
    this.password = dataFormLogin.password
  }
  async auth():Promise<TDBUser|null>{ 

    const serviceUser = new ServiceUsers(this.INN)
    const candidateAuth =await serviceUser.getUserByPhone(this.phone)
   

    if(!candidateAuth)return null

    if(isError(candidateAuth)){
      this.logError(candidateAuth)
      return null //?as TError
    }
    
    const isCorrectedPassword = await bcrypt.compare(this.password,candidateAuth.password)
    
    
    if(isCorrectedPassword){
      return candidateAuth

    }else{
      const er:TError={
        error :true,message:`error auth ,invalid password phone user:${ this.phone},inn  :${this.INN}`
      }
      this.logError(er)
      return null
    }
    
  }

  
}

// const Auth = async (data: TFormLogin): Promise<TDBUser | null > => {
  
//   if(!data.INN)return null
//   const serviceUser = new ServiceUsers(data.INN)
//   const user = await serviceUser.getUserByPhone(data.phone)  
//   if (!user ) return null;
//   if(isError(user))return null

//   if (await bcrypt.compare(data.password, user.password)) {
//     return user;
//   } else {
//     return null;
//   }
// };
// const ControllersAuth = {
//   Auth,
// };
// export default ControllersAuth;
