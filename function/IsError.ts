import { TError } from "@/Types/subtypes/TError";
/**
 * check for TERROR
 * 
 * 
 * @param data 
 * @returns boolean
 */

export const isError = (data: any| TError): data is TError => {  
  
  return data.hasOwnProperty('error');
};
