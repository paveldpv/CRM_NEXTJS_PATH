import { TAnswerUpdateDB, TDBUser, TFormRegistrate } from "@/Types/Types";
import { changeAllowINN } from "../../function/changeAllowINN";
import bcrypt from "bcrypt";
import moment from "moment";

import ControllerUsers from "./Users";

import ControllerConfigApp from "./ConfigApp";

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

  const saveInitialConfigUser = await ControllerConfigApp.setConfig(data.INN, data.idUser); // ! на обработать если сохранеине не произошло

  return saveData;
};
const ControllerRegistrate = {
  registrateNewOrganization
};

export default ControllerRegistrate;
