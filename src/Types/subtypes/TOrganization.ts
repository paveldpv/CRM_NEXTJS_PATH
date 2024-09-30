import { TEntities } from "../abstractsType/abstractsType";
import { TResponseUploadFiles } from "../Types";
import { TCoordinateLocation } from "./TGeoLocation";

//#region ORGANIZATION
// export type TValueFiledRequisites<T> = {
//   title: string;
//   value?: T;
// };
export type TActualAddress = {
  location:TCoordinateLocation,
  actualAddress :string
};

export type TEmai = {
  password: string;
  email: string;
  dataUpdate: Date;
};

export type TTelegramParams = {
  idTelegramBot: string;
  hrefChat: string;
};
export type TNameOrganization = {
  abbreviated: string;
    fullName: string;
}

export type TDataOrganization = {
  INN: number | string;
  dateRegistration: Date;
  nameOrganization:TNameOrganization
  // requisites: TRequisites;
  paramsEmailNewsletter: TEmai;
  seal: TResponseUploadFiles | "NOT_FOUND";
  telegram: TTelegramParams;
  actualAddress: TActualAddress;
};

//#endregion ORGANIZATION
