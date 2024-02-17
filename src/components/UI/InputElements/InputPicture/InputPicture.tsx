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
}: TInputProps) {
  return (
    <section>
      <div className=" flex items-center justify-center">
        {visible ? (
          <MiniLoader />
        ) : (
          <div>
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
          </div>
        )}
      </div>
    </section>
  );
}
