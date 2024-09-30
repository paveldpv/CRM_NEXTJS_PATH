import { _ALLOW_INN } from "../config/_ALLOWINN";
/**
 *  compare current inn  with allow list inn
 * 
 * alow list inn create by hand
 * 
 * @param INN 
 * @returns boolean
 */
export const isAllowINN = (INN: string): boolean => {  
   return _ALLOW_INN.includes(INN);
 };

