import { TDaDataOrganization } from "@/Types/subtypes/TDaDataOrganization";
import { TDataOrganization } from "@/Types/subtypes/TOrganization";
import { getAbbreviated } from "./getAbbreviated";

export const getInitialDataOrganization = (  daData: TDaDataOrganization,  date: Date): Partial<TDataOrganization> => {
   const {data,value,unrestricted_value}=daData

  const initialDataOrganization: TDataOrganization = {
    INN: data.inn!,
    dateRegistration: date,
    nameOrganization: {
      abbreviated: getAbbreviated(value) ,
      fullName: value || unrestricted_value!,
    },
    paramsEmailNewsletter: {
      password: "не задано",
      email: "не задано",
      dataUpdate: date,
    },
    seal: "NOT_FOUND",
    telegram: {
      idTelegramBot:  "не задано",
      hrefChat:  "не задано",
    },
    actualAddress:{
      location:{
        latitude:0,
        longitude:0
      },
      actualAddress:"не задано"
    }
  };
  return initialDataOrganization
};
