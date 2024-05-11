export type TGeoLocation = {
   location:{
      latitude:number,
      longitude:number
   },
   date:Date,
   process:PURPOSE_USE,
   idEmployee:string,
   ip?:string
   
}

export enum PURPOSE_USE {
   redact='REDACT',
   auth="AUTH",
   registrate="REGISTRATE"
}