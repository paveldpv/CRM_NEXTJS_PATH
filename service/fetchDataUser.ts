import { TAnswerUpdateDB, TDBUser } from "@/Types/Types";

export const fetchUpdateDataUser = async (
  data: TDBUser
): Promise<TAnswerUpdateDB> => {
  try {
    const response = await fetch(`/api/datauser/${data.INN}/updatedatauser`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    return {
      success: false,
      message: `error update data user server,error :${error}`,
    };
  }
};

export const deleteUser = async (
  INN: number,
  idUser: string
): Promise<TAnswerUpdateDB> => {
  try {
    const response = await fetch(`api/datauser/${INN}/updatedatauser`, {
      method: "DELETE",
      body: JSON.stringify({ idUser }),
    });

    return response.json();
  } catch (error) {
    return {
      success: false,
      message: `error delete user,id user :${idUser},error:${error}`,
    };
  }
};

export const deletePhotoUser =async(INN:number,idUser:string,fullPath:string): Promise<TAnswerUpdateDB>=>{
  try {
    const response = await fetch(`/api/datauser/${INN}/deletePhoto`, {
      method: "POST",
      body: JSON.stringify({idUser,fullPath}),
    });

    return response.json();
  } catch (error) {
    return {
      success: false,
      message: `error deleted photo user server,error :${error}`,
    };
  }
}
export const getUser = async (
  INN: number,
  idUser: string
): Promise<TDBUser|null> => {
  try {
    const response = await fetch(`api/datauser/${INN}/getUser`, {
      method: "DELETE",
      body: JSON.stringify({ idUser }),
    });

    return response.json();
  } catch (error) {
    return null
  }
};