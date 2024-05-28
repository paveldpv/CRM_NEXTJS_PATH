
import { TQueryGetDaDataOrganization } from "@/Types/subtypes/TQueryGetDaDataOrganization";
import { apiKey } from "../../config/DaDataConfig";
import { TError } from "@/Types/subtypes/TError";
import { TDaDataOrganization } from "@/Types/subtypes/TDaDataOrganization";

export const fetchGetDataOrganization = async (
  queryData: TQueryGetDaDataOrganization
): Promise<TDaDataOrganization | TError> => {

  const url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";

  
  
  try {
    const responseData = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + apiKey,
      },
      body: JSON.stringify(queryData),
    });
    
    console.log(responseData.status);
    
    
    if (responseData.ok) {
      const data = await responseData.json();

      console.log(`working fetch data organization..`);
      
      return data.suggestions[0] as TDaDataOrganization;
    }else{
      return {
        message: `error get data from DaData , response not OK`,
        error:true
      };
    }
    

   
  } catch (error) {
    return {
      message: `error fetch get data Organization, error ${error}`,
      error:true
    };
  }
};
