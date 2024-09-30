import { TError } from "@/Types/subtypes/TError";

export default class Logger {
   log(message:string){
      console.log(message);
      
   }
   logError(error:TError){
      console.warn("===== E R R O R ====");      
      console.error(error.message);
      console.warn("===== E R R O R ====");
   }
}