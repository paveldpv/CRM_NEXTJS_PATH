"use client";
import { FaFileDownload } from "react-icons/fa";
import { useMemo, useState, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { Ref, forwardRef, useId } from "react";
import { FormikErrors } from "formik/dist/types";
import FiledNameFile from "./FiledNameFile";
import { File } from "buffer";

export type TInputFile = {
  setFieldValue: (
    field: string,
    value: any[],
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<{ files?: File }>> | Promise<void>;
  values?: FileList;
};

const InputFile = forwardRef(({ setFieldValue, values }: TInputFile, ref: Ref<HTMLInputElement>) => {
  const idInputFile = useId();
  const arrayFiles = useMemo(() => {
    if (values && values.length !== 0) {
      return [...values];
    }
  }, [values]);

  if (arrayFiles && arrayFiles.length !== 0 && values) {
    return (
      <ul className=" max-h-32 overflow-auto flex gap-1 flex-col border-solid border-2 border-menu_color text-menu_color p-1">
        <div className=" border-b-2 border-dashed border-menu_color p-2">
          <label className="hover:text-white cursor-pointer " 
          htmlFor={idInputFile}>
            <div className="flex  flex-col  items-center gap-2 text-xl">
              <FaFileDownload />
            </div>
          </label>

          <input
            multiple
            hidden
            type="file"
            name="files"
            id={idInputFile}
            onChange={(e) => {
              // Object is possibly null error w/o check
              if (e.currentTarget.files) {
                
                setFieldValue("files", [...e.currentTarget.files,...arrayFiles]);
              }
            }}
          />
        </div>
        <div>
          {arrayFiles?.map((file, index) => (
            <FiledNameFile file={file} key={index} setFieldValue={setFieldValue} values={values} />
          ))}
        </div>
      </ul>
    );
  } else {
    return (
      <>
        <Tooltip title={`Если необходимо`}>
          <label
            className="  text-menu_color flex justify-center items-center items-center  font-bold w-full h-20 border-2 border-dashed  border-menu_color rounded-md xl:text-lg lg:text-xs sm:text-xs "
            htmlFor={idInputFile}
          >
            <div className="flex  flex-col  items-center gap-2">
              <FaFileDownload />
              Загрузите файлы
            </div>
          </label>
        </Tooltip>
        <input
          multiple
          hidden
          type="file"
          name="files"
          id={idInputFile}
          onChange={(e) => {
            // Object is possibly null error w/o check
            if (e.currentTarget.files) {
              setFieldValue("files", [...e.currentTarget.files]);
            }
          }}
        />
      </>
    );
  }
});

InputFile.displayName = "InputFile";

export default InputFile;
