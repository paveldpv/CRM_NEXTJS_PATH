import { TResponseUploadFiles } from "../Types";

//#region ORGANIZATION
export type TValueFiledRequisites<T> = {
  title: string;
  value?: T;
};
export type TRequisitesBank = {
  [key: string]: TValueFiledRequisites<string | number>;
  checkingAccount: TValueFiledRequisites<number>;
  nameBank: TValueFiledRequisites<string>;
  korAccount: TValueFiledRequisites<string>;
  BIK: TValueFiledRequisites<number>;
};

export type TRequisites = {
  [key: string]:
    | TValueFiledRequisites<string | number | string[]>
    | TRequisitesBank
    | TResponseUploadFiles
    | "NOT_FOUND";
  INN: TValueFiledRequisites<number>;
  KPP: TValueFiledRequisites<number>;
  legalAddress: TValueFiledRequisites<string>;
  mailAddress: TValueFiledRequisites<string>;
  phone: TValueFiledRequisites<string>;
  nameDirector: TValueFiledRequisites<string>;
  email: TValueFiledRequisites<string>;
  OGRN: TValueFiledRequisites<number>;
  OKVD: TValueFiledRequisites<string[]>;
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

export type TDaDataOrganization = {
  dataRegistrateFormApp?: Date;

  value?: string;
  unrestricted_value?: string;
  data: {
    capital?: string;
    kpp: number;
    invalid?: string;
    management: {
      name?: string;
      post?: string;
      disqualified?: string;
    };
    founders?: any; //учередители
    managers?: any; //
    predecessors?: any;
    branch_type?: "MAIN" | "BRANCH";
    branch_count?: number;
    hid?: string;
    type?: "LEGAL " | "PHYSICAL";
    state: {
      status?: "ACTIVE" | "LIQUIDATING" | "LIQUIDATED" | "BANKRUPT" | "REORGANIZING";
      actuality_date?: string;
      registration_date?: string;
      liquidation_date?: string;
    };
    // opf: {
    //   type?: string;
    //   code?: string;
    //   full?: string;
    //   short?: string;
    // };
    name: {
      full_with_opf?: string;
      short_with_opf?: string;
      latin?: string;
      full?: string;
      short?: string;
    };
    inn: string;
    ogrn: string;
    okpo: string;
    okato: string;
    oktmo: string;
    okogu: string;
    okfs: string;
    okved: string;
    okveds: {
      main: string;
      type: string;
      code: string;
      name: string;
    }[];
    address: {
      value: string;
      unrestricted_value: string;
    };
    phone: string;
    emails: {
      value: string;
    }[];
    ogrn_date: string;
    employee_count: number;
  };
};
