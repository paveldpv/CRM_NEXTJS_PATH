import { TEntities } from "./abstractsType/abstractsType";
import { idLink } from "./enums";
import { TError } from './subtypes/TError'



export type TLink = {
  id: idLink;
  href: string;
  description: string;
  title: string;
  paramsHref?:string[]
  readonly?:boolean
};

export type TDBCollectedUsers = Omit<TDBUser, "password">;

export type TFieldData = {
  [key: string | number]: string | boolean | undefined;
  title: string;
  placeholder: string;
  type: string;
  name: string;
  multiline?: boolean;
};

export type TFormLogin = {
  phone: string;
  password: string;
  INN: string;
};
export type TFormRegistrate = {
   [key:string]:string|boolean|number|TLink[]|Date
   idUser:string
  // INN: number | null;
  email: string;
} & TFormLogin;



export type TDBUser = {
  phone: string;
  password: string;
  INN: string;  
  idUser:string  
  email: string;  
  dateRegistrate?: Date;
  name?: string;
  surname?: string;
  lastName?: string;
  dateBirthday?: Date;
  nameJobTitle?: string;
  linksAllowed: TLink[] | "ADMIN";  
  srcPhoto: "NOT_FOUND" | TResponseUploadFiles;
}  &TEntities;


export type TWithoutPassUser= Omit<TDBUser,"password"> 



export type TResponse ={
  status:number,
  response:TError|'OK'
}

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
  SizeFile?: number;
  fileFormat?:string 
};
export type TResponseDeletedFile = {
  Approved:boolean,
  MessageError?:string
}



export type TErrored = {
  error: boolean;
  message?: string;
};





// type T1 = {
//   field_one:string
// }

// type T2 = {
//    [key:string]:string|boolean|number
//   field_two:number
// } & T1

// type T3 ={
//   field_three:boolean
// } & T2




// const temp_3:T3={
//   field_two:0,
//   field_one:"test",
//   field_three:false
// }


// type omitType = Omit<T3,"field_three"> 


// const temp_OMIT:omitType = {
  
// }
