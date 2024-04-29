import { TError } from "@/Types/subtypes/TError";
import { TDaDataOrganization } from "@/Types/subtypes/TOrganization";

export const isError = (data: any| TError): data is TError => {  
  
  return data.hasOwnProperty('error');
};
