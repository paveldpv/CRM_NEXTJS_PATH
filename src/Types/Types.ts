import { idLink, nameSettingLayout, keyConfigLayout, keyColorOption } from "./enums";

//#region type visual config app

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type TColorConfig = {
  bgColor: string | RGB | RGBA | HEX;
  textColor: string | RGB | RGBA | HEX;
  borderColor: string | RGB | RGBA | HEX;
};

export type TConfigAPP = {
  idUser: string;
  configHeader: TConfigLayout;
  configMain: TConfigLayout;
  configNavMenu: TConfigLayout;
};

export type TConfigLayout = {
  name: nameSettingLayout;
  color: TColorConfig;
  textSize: string;
  font: string;
  keyConfig: keyConfigLayout;
};

export type TUpdateStateConfigApp = {
  name: string;
  value: string;
  key: keyConfigLayout;
  keyColorOption: keyColorOption;
};

//#endregion

//#region type prev calc request
export type TSketchDetail = {
  idSketch: string;
  lines: TLine[];
  params: TParamsSegment[];
};

export type TLine = {
  idLine: string;
  points: number[];
  mark: string;
  value?: number;
};

export type TParamsSegment = {
  idLine: string;
  mark: string;
  value: number | string;
  description: string;
};

export type TInitialValuesFormPrevCalc = {
  [key: string]: string | unknown;
  email: string;
  phone: string;
  name: string;
  surName: string;
  description: string;
  INN: string;
  files: unknown | TResponseUploadFiles[];
};

export type TPointAuxiliary = {
  startAuxiliary: number[];
  endAuxiliary: number[];
  startAuxiliaryMirror: number[];
  endAuxiliaryMirror: number[];
  pointArrow: number[];
  pointArrowMirror: number[];
  coordinateText: TCoordinate;
  coordinateTextMirror: TCoordinate;
  angle: number;
};

export type TCoordinate = {
  x: number;
  y: number;
};

export type TRequestPrevCalc = {
  dataClient: TInitialValuesFormPrevCalc;
  dataSketch: TSketchDetail[] | undefined;
  idRequest?: string;
  dateRequest?: Date;
  verified?: boolean;
  safeDeleted?: boolean;
  favorites?: boolean;
};

//#endregion

export type TLink = {
  id: idLink;
  href: string;
  description: string;
  title: string;
};

export type TDBCollectedUsers = Omit<TDBUser, "password">;

export type TFieldData = {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  multiline?: boolean;
  [key: string | number]: string | boolean | undefined;
};

export type TFormLogin = {
  phone: string;
  password: string;
  INN: number | any;
};
export type TFormRegistrate = {
  // INN: number | null;
  email: string;
} & TFormLogin;

export type TDBUser = {
  idUser: string;
  dateRegistrate?: Date;
  name?: string;
  surname?: string;
  lastName?: string;
  dateBirthday?: Date;
  nameJobTitle?: string;
  linksAllowed: TLink[] | "ADMIN";
  //srcPhot:"NOT_FOUND" | TResponseUploadFiles|string
  srcPhoto: string | TResponseUploadFiles;
} & TFormRegistrate;

export type TAnswerUpdateDB = {
  success: boolean;
  message?: string;
};

export type TAuthAnswer = {
  hash_password?: string;
} & TAnswerUpdateDB;

export type TResponseService = {
  success: boolean;
  message?: string;
  data?: any;
};

export type TResponseUploadFiles = {
  FullPath: string;
  NameFile: string;
  DateTimeUpdateFile: Date;
  Errored: boolean;
  IDFile: string;
  size?: number;
};

//#region ORGANIZATION
export type TRequisitesBank = {
  checkingAccount: number;
  nameBank: string;
  korAccount: string;
  BIK: number;
};
export type TRequisites = {
  INN: number;
  KPP: number;
  legalAddress: string;
  mailAddress: string;
  phone: string;
  nameDirector: string;
  email: string;
  OGRN: number;
  OKVD: string[];
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
};

export type TDataOrganization = {
  idAdministrators: string[];
  INN: number;
  nameOrganization: string;
  requisites: TRequisites;
  paramsEmailNewsletter: TEmai;
  seal: TResponseUploadFiles | "NOT_FOUND";
  telegram: TTelegramParams;
};

//#endregion ORGANIZATION
