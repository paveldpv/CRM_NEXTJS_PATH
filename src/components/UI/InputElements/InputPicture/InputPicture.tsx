import Image from "next/image";
import { SERVER_DOTNET } from "../../../../../config/config";
import MiniLoader from "../../Loaders/MiniLoader";
import { MdDelete } from "react-icons/md";

export type TInputProps = {
  name: string;
  imageHeight: number;
  imageWidth: number;
  imageAlt: string;
  handlerChangePicture: (file: File) => void;
  visible: boolean;
  defaultSrc: string;
  title?:string

  src?: string;
  removePhoto?: (src: string) => void;
};

export default function InputPicture({
  name,
  imageHeight = 100,
  imageWidth = 100,
  imageAlt = "not found",
  handlerChangePicture,
  visible,
  defaultSrc,
  src,
  removePhoto,
  title="изображение"
}: TInputProps) {
  return (
    <section>
      <div className=" flex items-center justify-center">
        {visible ? (
          <MiniLoader />
        ) : (
          <fieldset className="border-2 border-solid border-menu_color p-3 w-full text-xs  rounded-xs  rounded-md col-span-1">
            <legend className=" pr-1 pl-1">{title}</legend>
            <label htmlFor={name} className=" cursor-pointer">
              <Image
                className=" p-2 rounded-xl"
                src={src ? `${SERVER_DOTNET}/${src}` : defaultSrc}
                width={imageWidth}
                height={imageHeight}
                alt={imageAlt}
              />
            </label>
            <input
              type="file"
              id={name}
              hidden
              onChange={(e) => {
                const selectFile = e.target.files ? e.target.files[0] : null;
                if (!selectFile) return;

                handlerChangePicture(selectFile);
              }}
            />
            {src != defaultSrc && removePhoto && src && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removePhoto(src);
                }}
              >
                <MdDelete />
              </button>
            )}
          </fieldset>
        )}
      </div>
    </section>
  );
}
