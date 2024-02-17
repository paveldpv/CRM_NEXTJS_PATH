import { _ALLOWINN } from "../config/_ALLOWINN";

export const changeAllowINN = (INN: number): boolean => {  
   return _ALLOWINN.includes(INN);
 };