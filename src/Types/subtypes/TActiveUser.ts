export type TActiveUser={
   idUser:string,
   active:Boolean
   dataEntry:TDataEntry,
   token?:string//! 
}
export type TDataEntry={
   lastActiveTime:Date,
   historyDateActive:Date[]
}