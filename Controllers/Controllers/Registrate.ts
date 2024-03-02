import { TAnswerUpdateDB, TDBUser, TDataOrganization, TFormRegistrate } from "@/Types/Types";
import { changeAllowINN } from "../../function/changeAllowINN";
import bcrypt from "bcrypt";
import moment from "moment";

import ControllerUsers from "./Users";
import ControllerConfigApp from "./ConfigApp";
import ControllerOrganization from "./Organization";

/**
 *  while creating new organization create new data user  with params "linksAllowed " == "ADMIN"
 * create  initial view config
 * create initial params organization
 */

const registrateNewOrganization = async (data: TDBUser): Promise<TAnswerUpdateDB> => {
  if (!(data.INN && changeAllowINN(data.INN))) {
    console.log("INN Not allowed");
    return { success: false, message: "Данная орагнизация не согласована с владельцем платформы" };
  }

  const changeOrganization = await ControllerUsers.getUsers(data.INN);

  if (changeOrganization?.length !== 0) {
    return {
      success: false,
      message: "данная организация уже зарегистрирована на платформе",
    };
  }

  const { SALT_ROUND } = require("./../../config/RegistrateConfig");
  const genSalt = await bcrypt.genSalt(SALT_ROUND);
  const registrateData = {
    ...data,
    password: bcrypt.hashSync(data.password, genSalt),
    dateRegistrate: moment().toDate(),
  };

  const saveData = await ControllerUsers.addNewAdmin(registrateData);

  const saveInitialConfigUser = await ControllerConfigApp.setConfig(data.INN, data.idUser); 
  //
  const saveInitialDataOrganization = await ControllerOrganization.createNewOrganization(data.INN, data.idUser);

  
  if (saveData.success && saveInitialConfigUser?.success && saveInitialDataOrganization.success) {
    return {
      success: true,
    };
  }
  return {
    success: false,
    message: "Ошибка сохранения данных",
  };
};
const ControllerRegistrate = {
  registrateNewOrganization,
};

export default ControllerRegistrate;
