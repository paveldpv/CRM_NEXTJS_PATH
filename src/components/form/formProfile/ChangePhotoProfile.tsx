import { TDBUser } from "@/Types/Types";

import { SERVER_DOTNET } from "../../../../config/config";

import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { useDialogWindow } from "../../../../store/storeDialogWindow";

import { employeeImage } from "../../../../config/_thirdPartyResources/srcImage";

import MiniLoader from "@/components/UI/Loaders/MiniLoader";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

import { deletePhotoUser } from "../../../../service/fetchDataUser";
import { typeDialog } from "@/Types/enums";

type TChangePhotoProfile = {
  dataUser: TDBUser;
  visible: Boolean;
  setVisible: (state: boolean) => void;
  setUploadPhoto: Dispatch<File | null>;
  uploadPhoto: File | null | undefined;
  setData: any;
  setFiledValue: any;
};

export default function ChangePhotoProfile({
  visible,
  setUploadPhoto,
  dataUser,
  setVisible,
  setData,
  setFiledValue,
}: TChangePhotoProfile) {
  const [previewPhoto, setPreviewPhoto] = useState<string>(
    typeof dataUser?.srcPhoto != "string" ? `${SERVER_DOTNET}/${dataUser?.srcPhoto?.FullPath} `: employeeImage
  );
  
  
  

  const setDialogWindow = useDialogWindow((state) => state.setOpen);

  const uploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    setVisible(true);
    if (e.currentTarget.files) {
      setPreviewPhoto(URL.createObjectURL(e.currentTarget.files[0]));
      setUploadPhoto(e.currentTarget.files[0]);
      setVisible(false);
    }
    setVisible(false);
  };

  const removePhoto = async () => {
    setVisible(true);
    if (typeof dataUser.srcPhoto != "string") {
      setVisible(true);
      const deletedPhoto = await deletePhotoUser(
        dataUser.INN,
        dataUser.idUser,
        dataUser.srcPhoto.FullPath
      );
      console.log(deletedPhoto);
      
      if (deletedPhoto.success) {
        setFiledValue("srcPhoto", "NOT_FOUND");
        setData({ ...dataUser, srcPhoto: "NOT_FOUND" });
        setPreviewPhoto(employeeImage);
        setVisible(false);
        setDialogWindow(true, { title: "Фото удалено" });
        return;
      } else {
        setDialogWindow(true, { title: "Ошибка удаления фото" }, typeDialog.error);
      }
    } else {
      setData({ ...dataUser, srcPhoto: "NOT_FOUND" });
      setVisible(true);
      setPreviewPhoto(employeeImage);
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
  };

  return (
    <section className="col-span-1 ">
      <div className=" flex justify-center items-center ml-4 relative  mb-2 bg-[#97D4E6] h-full border-2 border-dashed border-menu_color rounded-lg">
        {visible ? (
          <MiniLoader />
        ) : (
          <div className=" flex flex-col">
            <label className=" cursor-pointer" htmlFor="photo_employee">
              <Image
                className="p-2 rounded-2xl "
                width={380}
                height={100}
                src={previewPhoto }
                alt={"not found"}
              />
            </label>
            <input
              accept="image/jpeg,image/png,image/gif"
              type="file"
              name="src"
              id="photo_employee"
              hidden
              onChange={uploadPhoto}
            />
            {previewPhoto!=employeeImage && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removePhoto();
                }}
                className=" text-2xl flex justify-center items-center mr-3 ml-3"
              >
                <MdDelete />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
