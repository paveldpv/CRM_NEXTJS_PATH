import { TError } from "@/Types/subtypes/TError";

export default class Logger {
  protected log(message:string){
      console.log(message);
      
   }
  protected logError(error:TError){
      console.warn("===== E R R O R ====");      
      console.error(error.message);
      console.warn("===== E R R O R ====");
   }
}