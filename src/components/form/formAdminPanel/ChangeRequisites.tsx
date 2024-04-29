"use client";
import { TFieldFormAdminPanel } from "./FormAdminPanel";

import React, { useId, useState, useCallback, memo, useEffect, useMemo } from "react";
import { useMiniLoader } from "../../../../store/storeMiniLoader";

import MiniLoader from "@/components/UI/Loaders/MiniLoader";

import { FaFileUpload } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { Accordion, AccordionDetails, AccordionSummary, TextField, Tooltip } from "@mui/material";

import { styleTextFiled } from "../../../../config/muiCustomStyle/textField";
import { TRequisites, TValueFiledRequisites } from "@/Types/subtypes/TOrganization";

export type TChangeRequisites = {} & TFieldFormAdminPanel;

function ChangeRequisites({ activeField, defaultData, handlerChange }: TChangeRequisites) {
  const { requisites, ...otherOption } = defaultData;
  const { requisitesBank, srcRequisites, _id, ...baseRequisites } = requisites!;



  const initialFieldBaseRequisites: {
    name: string;
    data: TValueFiledRequisites<string | number | string[]>;
  }[] = useMemo(() => {
    let res = [];
    for (const key in baseRequisites) {
      const data = baseRequisites[key] as TValueFiledRequisites<string | number | string[]>;
      res.push({
        name: key,
        data,
      });
    }
    return res;
  }, [defaultData]);

  const initialFieldBankRequisites = useMemo(() => {
    let res = [];
    for (const key in requisitesBank) {
      if (key !== "_id") {
        const data = requisitesBank[key];
        res.push({
          name: key,
          data,
        });
      }
    }
    return res;
  }, [defaultData]);

  const idInput = useId();
  const [loader, setLoader] = useMiniLoader((state) => [state.visible, state.setVisibleLoader]);
  const [dataRequisites, setDataRequisites] = useState(requisites);

  const [arrFieldBaseRequisites, setArrFieldBaseRequisites] = useState(initialFieldBaseRequisites);
  const [arrFieldBankRequisites, setFieldBankRequisites] = useState(initialFieldBankRequisites);

  const [activeFieldFile, setActiveFieldFile] = useState(false);

  useEffect(() => setLoader(true), []);

  //#region dragFile
  const dragEntry = useCallback((e: React.DragEvent<HTMLFieldSetElement>) => {
    setActiveFieldFile(true);
  }, []);
  const dragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    setActiveFieldFile(false);
  }, []);
  const dragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }, []);

  const drop = useCallback(async (e: React.DragEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setLoader(true)
    const file = e.dataTransfer.files[0]
    // auto definition requisites
  }, []);
  //#endregion
  
  const onChangeFile = useCallback(async(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    e.stopPropagation()
    setLoader(true)
    if(!e.target.files || e.target.files.length === 0)return
    const file = e.currentTarget.files     

  },[])

  if (activeFieldFile) {
    return (
      <label
        onDrop={drop}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        className=" flex justify-center items-center w-full h-full border-2  mt-3 border-dashed border-menu_color p-3 text-4xl  rounded-xs  rounded-md col-span-2 "
        htmlFor={idInput}
      >
        <input multiple={false} type="file" id={idInput} hidden accept="application/pdf, .docx" />
        <FaFileUpload />
      </label>
    );
  } else {
    return (
      <fieldset
        className="border-2 border-solid border-menu_color p-3 text-xs  rounded-xs  rounded-md col-span-2"
        onDragEnter={dragEntry}
      >
        <Tooltip title="для автозаполнения добавьте файл с реквзитами ">
          <legend className=" pr-1 pl-1 flex  gap-2">
            <span>Реквизиты</span>
            <label htmlFor={idInput} className=" text-sm cursor-pointer hover:text-color_header">
              <FaFileUpload />
            </label>
            <input onChange={onChangeFile} accept="application/pdf, .docx" multiple={false} type="file" id={idInput} hidden />
          </legend>
        </Tooltip>
        {loader ? (
          <div className=" flex justify-center items-center mt-24">
            <MiniLoader />
          </div>
        ) : (
          <ul className=" flex flex-col gap-2">
            <Accordion>
              <AccordionSummary
                expandIcon={
                  <p className=" text-2xl">
                    <FaArrowCircleDown />
                  </p>
                }
              >
                <h5 className=" underline font-bold">Реквизиты</h5>
              </AccordionSummary>
              <AccordionDetails className=" p-4 flex flex-col gap-2">
                {arrFieldBaseRequisites.map((item, index) => (
                  <TextField
                    key={index}
                    {...styleTextFiled}
                    defaultValue={item.data.value?.toString()}
                    disabled={activeField}
                    fullWidth
                    multiline
                    onChange={handlerChange}
                    placeholder={item.data.title}
                    name={item.name}
                    label={item.data.title}
                  />
                ))}
                {typeof dataRequisites?.srcRequisites === "string" ? (
                  <input type="file" />
                ) : (
                  <Tooltip title={`размер файла - ${dataRequisites?.srcRequisites.size || "не определен"}`}>
                    <a download href={dataRequisites?.srcRequisites.FullPath}>
                      {dataRequisites?.srcRequisites.NameFile} - скачать
                    </a>
                  </Tooltip>
                )}
              </AccordionDetails>
            </Accordion>
            <hr />
            <Accordion>
              <AccordionSummary
                expandIcon={
                  <p className=" text-2xl">
                    <FaArrowCircleDown />
                  </p>
                }
              >
                <h5 className=" underline font-bold">Банковские реквизиты</h5>
              </AccordionSummary>
              <AccordionDetails className=" p-4 flex flex-col gap-2">
                {arrFieldBankRequisites.map((item, index) => (
                  <TextField
                    key={index}
                    {...styleTextFiled}
                    defaultValue={item.data.value?.toString()}
                    disabled={activeField}
                    fullWidth
                    multiline
                    onChange={handlerChange}
                    placeholder={item.data.title}
                    name={item.name}
                    label={item.data.title}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          </ul>
        )}
      </fieldset>
    );
  }
}

/**
 * update,viewing and redaction data:
 *
 * - requisites and requisites bank
 *
 * - auto fill data(drag and drop event)
 *
 * - memo function
 */

export default memo(ChangeRequisites);
