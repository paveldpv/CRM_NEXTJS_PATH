"use client";
import { TFieldFormAdminPanel } from "./FormAdminPanel";

import { useId, useState, useCallback, memo, useEffect } from "react";
import { useMiniLoader } from "../../../../store/storeMiniLoader";

import MiniLoader from "@/components/UI/Loaders/MiniLoader";

import { FaFileUpload } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { Accordion, AccordionDetails, AccordionSummary, TextField, Tooltip } from "@mui/material";

import { styleTextFiled } from "../../../../config/muiCustomStyle/textField";

export type TChangeRequisites = {} & TFieldFormAdminPanel;

function ChangeRequisites({ activeField, defaultData, handlerChange }: TChangeRequisites) {
  const { requisites, ...otherOption } = defaultData;

  const idInput = useId();
  const [loader, setLoader] = useMiniLoader((state) => [state.visible, state.setVisibleLoader]);
  const [dataRequisites, setDataRequisites] = useState(requisites);
  const [activeFieldFile, setActiveFieldFile] = useState(false);

  useEffect(() => setLoader(false), []);

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
    console.log(e.dataTransfer.files[0]);
    // auto definition requisites
  }, []);
  //#endregion

  if (activeFieldFile) {
    return (
      <label
        onDrop={drop}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        className=" flex justify-center items-center w-full h-full border-2  mt-3 border-dashed border-menu_color p-3 text-4xl  rounded-xs  rounded-md col-span-2 "
        htmlFor={idInput}
      >
        <input multiple={false} type="file" id={idInput} hidden />
        <FaFileUpload />
      </label>
    );
  } else {
    return (
      <fieldset
        className="border-2 border-solid border-menu_color p-3 text-xs  rounded-xs  rounded-md col-span-2"
        onDragEnter={dragEntry}
      >
        <legend className=" pr-1 pl-1">Реквизиты</legend>
        {loader ? (
          <div className="flex content-center items-center">
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
              <AccordionDetails className=" p-4 flex flex-col gap-1">
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.INN}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="ИНН"
                  name="INN"
                  label="ИНН"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.KPP}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="КПП"
                  name="KPP"
                  label="КПП"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.legalAddress}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="Юр.Адрес"
                  name="legalAddress"
                  label="Юр.Адрес"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.mailAddress}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="почт.Адрес"
                  name="mailAddress"
                  label="почт.Адрес"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.phone}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="тел."
                  name="phone"
                  label="тел."
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.email}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="эл.Почта"
                  name="email"
                  label="эл.Почта"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.nameDirector}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="директор"
                  name="nameDirector"
                  label="директор"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.OGRN}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="ОГРН"
                  name="OGRN"
                  label="ОГРН"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.OKVD}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="ОКВЭД"
                  name="OKVD"
                  label="ОКВЭД"
                />
                {typeof dataRequisites?.srcRequisites ==="string"  ? (
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
              <AccordionDetails className=" p-4 flex flex-col gap-1">
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.requisitesBank.checkingAccount}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="рас.Счет"
                  name="checkingAccount"
                  label="рас.Счет"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.requisitesBank.nameBank}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="Банк"
                  name="nameBank"
                  label="Банк"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.requisitesBank.korAccount}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="кор.Счет"
                  name="korAccount"
                  label="кор.Счет"
                />
                <TextField
                  {...styleTextFiled}
                  defaultValue={dataRequisites?.requisitesBank.BIK}
                  disabled={activeField}
                  fullWidth
                  multiline
                  onChange={handlerChange}
                  placeholder="БИК"
                  name="BIK"
                  label="БИК"
                />
              </AccordionDetails>
            </Accordion>
          </ul>
        )}
      </fieldset>
    );
  }
}
export default memo(ChangeRequisites);
