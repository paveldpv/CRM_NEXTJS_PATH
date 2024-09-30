import { TError } from "@/Types/subtypes/TError";
/**
 * check for TERROR
 * 
 * 
 * @param data 
 * @returns boolean
 */

export const isError =<T> (data: any| TError): data is TError => {  
  
    return (data as TError)?.error!==undefined
 // return data?.hasOwnProperty('error');
};

// function isFish(pet: Fish | Bird): pet is Fish {
//   return (pet as Fish).swim !== undefined;
// }