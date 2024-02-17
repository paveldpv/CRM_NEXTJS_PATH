"use client";
import { memo } from "react";
import { TInputFile } from "./InputFile";
import { useCallback, useState } from "react";
import { MdDelete } from "react-icons/md";

type TFiledNameFile = {
  file: globalThis.File;
};

 function FiledNameFile({
  file,
  setFieldValue,
  values,
}: TFiledNameFile & Required<TInputFile>) {
  const mouseLeave = useCallback(() => {
    setHover(false);
  }, []);
  const mouseEntry = useCallback((index: number) => {
    setHover(true);
  }, []);
  const [hover, setHover] = useState(false);

  const removeFile = useCallback(() => {
    setFieldValue(
      "files",
      [...values].filter((item) => item.name != file.name)
    );
  }, [file]);

  return (
    <li className=" text-xs flex justify-between ">
      <span
        style={hover ? { color: "#FFFFFF" } : {}}
        className=" w-11/12 border-r-2 overflow-clip border-menu_color p-1 "
      >
        {file.name}
      </span>
      <span>
        <MdDelete
          onClick={removeFile}
          className=" text-2xl cursor-pointer hover:text-white"
          onMouseEnter={mouseEntry}
          onMouseLeave={mouseLeave}
        />
      </span>
    </li>
  );
}
export default memo(FiledNameFile)