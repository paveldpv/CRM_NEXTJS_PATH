import { TDaDataOrganization } from "@/Types/subtypes/TOrganization";
import { TQueryGetDataOrganization } from "@/Types/subtypes/TQueryGetDataOrganization";
import { apiKey } from "../../config/DaDataConfig";
import { TError } from "@/Types/subtypes/TError";

export const fetchGetDataOrganization = async (
  queryData: TQueryGetDataOrganization
): Promise<TDaDataOrganization | TError> => {
  const url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
  console.log(queryData);
  
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
