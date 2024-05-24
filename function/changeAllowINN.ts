import { _ALLOWINN } from "../config/_ALLOWINN";
/**
 *  compare current inn  with allow list inn
 * 
 * alow list inn create by hand
 * 
 * @param INN 
 * @returns boolean
 */
export const changeAllowINN = (INN: number): boolean => {  
   return _ALLOWINN.includes(INN);
 };

