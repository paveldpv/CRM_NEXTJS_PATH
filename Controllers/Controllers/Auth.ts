import { TDBUser, TFormLogin } from "@/Types/Types";

import ControllerUsers from "./Users";
import bcrypt from "bcrypt";

const Auth = async (data: TFormLogin): Promise<TDBUser | null> => {
  
  if(!data.INN)return null
  const user = await ControllerUsers.getUserByParams(data.INN,{phone:data.phone})  
  if (!user) return null;

  if (await bcrypt.compare(data.password, user.password)) {
    return user;
  } else {
    return null;
  }
};
const ControllersAuth = {
  Auth,
};
export default ControllersAuth;
