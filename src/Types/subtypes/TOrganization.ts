import { TResponseUploadFiles } from "../Types";

//#region ORGANIZATION
export type TValueFiledRequisites<T> = {
  title: string;
  value?: T;
};
export type TRequisitesBank = {
  [key:string]:TValueFiledRequisites<string|number>
  checkingAccount: TValueFiledRequisites<number>;
  nameBank       : TValueFiledRequisites<string>;
  korAccount     : TValueFiledRequisites<string>;
  BIK            : TValueFiledRequisites<number>;
};

export type TRequisites = {
  [key:string]:TValueFiledRequisites<string|number|string[]>|TRequisitesBank|TResponseUploadFiles|"NOT_FOUND";
  INN: TValueFiledRequisites<number>;
  KPP: TValueFiledRequisites<number>;
  legalAddress: TValueFiledRequisites<string>;
  mailAddress: TValueFiledRequisites<string>;
  phone: TValueFiledRequisites<string>;
  nameDirector:TValueFiledRequisites<string>;
  email:TValueFiledRequisites<string>;
  OGRN: TValueFiledRequisites<number>;
  OKVD:TValueFiledRequisites<string[]>;
  requisitesBank: TRequisitesBank;
  srcRequisites: TResponseUploadFiles | "NOT_FOUND";
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

export type TDataOrganization = {
  INN: number;
  dateRegistration: Date;
  nameOrganization: string;
  requisites: TRequisites;
  paramsEmailNewsletter: TEmai;
  seal: TResponseUploadFiles | "NOT_FOUND";
  telegram: TTelegramParams;
};

//#endregion ORGANIZATION
