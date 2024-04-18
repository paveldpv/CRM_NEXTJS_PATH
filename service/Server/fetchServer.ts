import { TErrored,  TResponseUploadFiles } from "@/Types/Types";
import { SERVER_DOTNET } from "../../config/config";
import { TRequisites } from "@/Types/subtypes/TOrganization";

export const fetchUploadFilePrevCal = async (
  formData: FormData
): Promise<TResponseUploadFiles[] | undefined> => {
  try {
    const response = await fetch(`${SERVER_DOTNET}/api/FileManager/uploadRequest`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      return;
    }

    if (response.ok) {
      return response.json() as Promise<TResponseUploadFiles[]>;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export const fetchUploadFileOrganization = async (
  formData: FormData
): Promise<TResponseUploadFiles[] | undefined> => {
  try {
    // const response = await fetch(`http://localhost:5147/api/FileManager/uploadDataFilesOrganization`, {
    //   method: "POST",
    //   body: formData,
    // });
    const response = await fetch(`${SERVER_DOTNET}/api/FileManager/uploadDataFilesOrganization`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return;
    }

    if (response.ok) {
      return response.json() as Promise<TResponseUploadFiles[]>;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export const fetchDeletedFiles = async (path: string[]): Promise<TResponseUploadFiles[] | undefined> => {
  try {
    const response = await fetch(`${SERVER_DOTNET}/api/FileManager/deletedFiles`, {
      method: "POST",
      body: JSON.stringify(path),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return;
    } else {
      return response.json() as Promise<TResponseUploadFiles[]>;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export const fetchGetFiledRequisites = async (formData: FormData): Promise<TRequisites | TErrored> => {
  try {
    const dataFiledRequisites = await fetch(`${SERVER_DOTNET}/api/getField/requisites`, {
      method: "POST",
      body: formData,
    });
    if (!dataFiledRequisites.ok) {
      return {
        error: true,
        message: "error get field requisites , error get  server data ,response not OK ",
      };
    }

    return dataFiledRequisites.json() as Promise<TRequisites>;
  } catch (error) {
    return {
      error: true,
      message: `error get field requisites , error server ,error = ${error}`,
    };
  }
};
