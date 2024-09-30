"use Client";


import { useState, useCallback, useMemo, SetStateAction, Dispatch } from "react";

import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

import { Modal } from "@mui/material";
import { Tooltip } from "@mui/material";

import PreviewSketch from "./PreviewSketc/PreviewSketch";
import NewSketch from "./NewSketch/NewSketch";
import { TSketchDetail } from "@/Types/subtypes/TRequestPrevCalc";

export default function SketchDetail({dataSketchDetail,setDataSketchDetail}: {
  dataSketchDetail: TSketchDetail[] | undefined;
  setDataSketchDetail: Dispatch<SetStateAction<TSketchDetail[] | undefined>>;
}) {
  const [open, setOpen] = useState(false);
  // const [dataSketchDetail, setDataSketchDetail] = useState<TSketchDetail[]>();
  const [idRedactSketch, setIdRedactSketch] = useState<string | undefined>(undefined);

  const openNewSketch = useCallback(() => {
    setOpen(true);
  }, []);

  const redactSketchData = useMemo(() => {
    if (dataSketchDetail?.length == 0) return;
    return dataSketchDetail?.find((sketch) => sketch.idSketch === idRedactSketch);
  }, [idRedactSketch]);

  return (
    <>
      <div className=" flex justify-between items-center mr-11 border-b-2 border-solid border-menu_color pb-2 ml-2">
        <h3 className=" text-menu_color text-2xl  pl-12  select-none flex gap-3  truncate">
          <span>Создать эскиз обрабатываемой поверхности</span>
          <FaChevronDown />
        </h3>
        <Tooltip title="Создать новый эскиз">
          <button type="button" onClick={openNewSketch} className=" text-4xl p-4">
            <MdOutlineAddToPhotos />
          </button>
        </Tooltip>
      </div>

      <div className="flex p-4 flex-wrap  gap-7  overflow-scroll h-full">
        {dataSketchDetail?.map((sketch, index) => (
          <PreviewSketch
            setDataSketchDetail={setDataSketchDetail}
            setIdRedactSketch={setIdRedactSketch}
            key={index}
            lines={sketch.lines}
            params={sketch.params}
            idSketch={sketch.idSketch}
            setOpen={setOpen}
          />
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <NewSketch
          lines={redactSketchData?.lines}
          params={redactSketchData?.params}
          setOpen={setOpen}
          idSketch={redactSketchData?.idSketch}
          setDataSketchDetail={setDataSketchDetail}
          setIdRedactSketch={setIdRedactSketch}
        />
      </Modal>
    </>
  );
}
