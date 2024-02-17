"use client";
import { useCallback, memo } from "react";
import { TConfigLayout, TUpdateStateConfigApp } from "@/Types/Types";
import TextField from "@mui/material/TextField";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useDataUser } from "../../../store/storeConfigApp";
import { Tooltip } from "@mui/material";
import { debounce } from "ts-debounce";
import { keyColorOption } from "@/Types/enums";

function InputSettingLayout({ color, textSize, font, name, keyConfig }: TConfigLayout) {
  
  const [updateColor]: [(config: TUpdateStateConfigApp) => void] = useDataUser((state) => [state.updateColor]);

  const handlerChangeColor = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updateNewColor: TUpdateStateConfigApp = {
      value: e.target.value,
      key: keyConfig,
      name: e.target.id,
      keyColorOption: e.target.id as keyColorOption,
    };
    updateColor(updateNewColor);
  }, []);

  return (
    <Accordion className=" border-2 border-solid border-menu_color p-2">
      <AccordionSummary
        expandIcon={
          <span className=" text-2xl text-color_header">
            <BsFillArrowUpCircleFill />
          </span>
        }
      >
        <span>{name}</span>
      </AccordionSummary>
      <ul className="text-sm flex flex-col gap-1">
        <li>
          <fieldset>
            <legend className="pl-2">Цвет</legend>
            <div className="flex justify-between gap-5">
              <Tooltip title="Цвет фона">
                <TextField
                  type="color"
                  id={keyColorOption.bgColor}
                  fullWidth
                  defaultValue={color?.bgColor}
                  onChange={debounce(handlerChangeColor, 200)}
                />
              </Tooltip>
              <Tooltip title="Цвет ободки элемента">
                <TextField
                  type="color"
                  fullWidth
                  id={keyColorOption.borderColor}
                  defaultValue={color?.borderColor}
                  onChange={debounce(handlerChangeColor, 200)}
                />
              </Tooltip>
              <Tooltip title="Цвет текста">
                <TextField
                  type="color"
                  id={keyColorOption.textColor}
                  fullWidth
                  defaultValue={color?.textColor}
                  onChange={debounce(handlerChangeColor, 200)}
                />
              </Tooltip>
            </div>
          </fieldset>
        </li>
        <li>
          <fieldset>
            <legend className="pl-2">текст</legend>
            <div className=" flex  gap-5">
              <TextField placeholder="размер текста" value={textSize} />
              <TextField placeholder="шрифт" value={font} />
            </div>
          </fieldset>
        </li>
      </ul>
    </Accordion>
  );
}
export default memo(InputSettingLayout);
