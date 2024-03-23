import { TDBUser, TAnswerUpdateDB, TFormLogin, TResponseService, TResponseUploadFiles } from "@/Types/Types";
import { TConfigAPP } from "@/Types/subtypes/TAppearanceConfigApp";

export const fetchRegistrate = async (data: TDBUser): Promise<TAnswerUpdateDB> => {
  const response = await fetch("api/registrate", { method: "POST", body: JSON.stringify(data) });
  if (!response.ok) {
    return {
      success: false,
    };
  }
  return response.json();
};

export const fetchSaveColorConfigApp = async (
  config: Partial<TConfigAPP>,
  dataUser: TDBUser
): Promise<TAnswerUpdateDB> => {
  const response = await fetch(`/api/submitconfigapp/${dataUser.INN}`, {
    method: "POST",
    body: JSON.stringify({ idUser: dataUser.idUser, dataConfig: config }),
  });

  if (!response.ok) {
    return {
      success: false,
    };
  }
  return response.json();
};
