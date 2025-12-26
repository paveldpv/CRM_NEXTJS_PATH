
import { TCoordinate, TLine, TParamsSegment, TPointAuxiliary } from '@/shared/model/types/TRequestPrevCalc'
import { log } from "console";
import { KonvaEventObject } from "konva/lib/Node";
import { useMemo, memo, useCallback, useReducer, useEffect } from "react";
import { Line, Arrow, Group, Circle, Text } from "react-konva";

type TSegment = {
  setCurrentLines?: React.Dispatch<React.SetStateAction<TLine[]>>;
  setCurrentParams?: React.Dispatch<React.SetStateAction<TParamsSegment[]>>;
  previewEntity?: boolean;
} & TLine;

function Segment({idLine, value, mark, points, setCurrentLines, setCurrentParams, previewEntity = false }: TSegment) {
  const [rotate, rotationAuxiliary] = useReducer((state) => !state, false);
 
  
  const pointAuxiliary: TPointAuxiliary = useMemo(() => {
    const [x1, y1, x2, y2] = points;
    const turn = (x2 - x1) / (y2 - y1) >= 0;
    const angle = turn ? Math.atan(Math.abs((x2 - x1) / (y2 - y1))) : Math.atan(Math.abs((y2 - y1) / (x2 - x1)));
    const rightAngleRad = turn ? 1.57079632679 : 1.57079632679 * 2;

    const rightAngleRadMirror = turn ? 1.57079632679 : 1.57079632679 * 4;

    const offsetSin = Math.sin(angle + rightAngleRad);
    const offsetCos = Math.cos(angle + rightAngleRad);

    const offsetSinRotate = Math.sin(angle - rightAngleRadMirror);
    const offsetCosRotate = Math.cos(angle - rightAngleRadMirror);

    const startAuxiliary = [
      x1,
      y1,
      x1 + 40 * offsetSin, //0
      y1 + 40 * offsetCos, //1
    ];

    const endAuxiliary = [x2, y2, x2 + 40 * offsetSin, y2 + 40 * offsetCos];

    const pointArrow = [
      x1 + 40 * offsetSin, //0
      y1 + 40 * offsetCos, //1
      x2 + 40 * offsetSin,
      y2 + 40 * offsetCos,
    ];

    const startAuxiliaryMirror = [x1, y1, x1 + 40 * offsetSinRotate, y1 + 40 * offsetCosRotate];
    const endAuxiliaryMirror = [x2, y2, x2 + 40 * offsetSinRotate, y2 + 40 * offsetCosRotate];

    const pointArrowMirror = [
      x1 + 40 * offsetSinRotate, //0
      y1 + 40 * offsetCosRotate, //1
      x2 + 40 * offsetSinRotate,
      y2 + 40 * offsetCosRotate,
    ];

    const coordinateText: TCoordinate = {
      x: (pointArrow[0] + pointArrow[2]) / 2,
      y: (pointArrow[1] + pointArrow[3]) / 2,
    };
    const coordinateTextMirror: TCoordinate = {
      x: (pointArrowMirror[0] + pointArrowMirror[2]) / 2,
      y: (pointArrowMirror[1] + pointArrowMirror[3]) / 2,
    };

    return {
      startAuxiliary,
      endAuxiliary,
      pointArrow,
      angle: turn ? angle : angle + 1.57079632679,
      startAuxiliaryMirror,
      endAuxiliaryMirror,
      pointArrowMirror,
      coordinateText,
      coordinateTextMirror,
    };
  }, [points]);

  const removeLine = useCallback(
    (e: KonvaEventObject<PointerEvent>) => {      
      e.evt.preventDefault();
      setCurrentLines && setCurrentLines((lines) => lines.filter((line) => line.idLine != idLine));
      setCurrentParams && setCurrentParams((params) => params.filter((param) => param.idLine !== idLine));
      const container = e.target.getStage()?.container();
      container!.style.cursor = "crosshair";
    },
    [points,idLine]
  );

  const mouseLeave = useCallback((e: KonvaEventObject<MouseEvent>) => {
    const container = e.target.getStage()?.container();
    container!.style.cursor = "crosshair";
  }, []);

  const mouseEnter = useCallback((e: KonvaEventObject<MouseEvent>) => {
    const container = e.target.getStage()?.container();
    container!.style.cursor = "pointer";
  }, []);

  const dbClick = useCallback(() => {
    rotationAuxiliary();
  }, []);

  return (
    <Group>
      <Line points={points} stroke={previewEntity ?"#4F5162":"#7281C0"} strokeWidth={previewEntity?4:1.2} />

      <Group opacity={previewEntity ?0:1}>
        <Line
          onDblClick={dbClick}
          onMouseEnter={(e)=>{
            if(previewEntity)return
            mouseEnter(e)
          }}
          onMouseLeave={ (e)=>{
            if(previewEntity )return
            mouseLeave(e)
          }}
          points={points}
          onContextMenu={removeLine}
          stroke={"#7281C0"}
          strokeWidth={40}
          opacity={0}
        />
        <Text
          offsetX={!!value ? `${mark} : ${value}мм.`.split("").length * 3.5 : mark.split("").length * 3.5}
          rotation={Math.ceil(90 - (pointAuxiliary.angle * 180) / Math.PI)}
          fontSize={12}
          x={rotate ? pointAuxiliary.coordinateTextMirror.x : pointAuxiliary.coordinateText.x}
          y={rotate ? pointAuxiliary.coordinateTextMirror.y : pointAuxiliary.coordinateText.y}
          text={!!value ? `${mark} : ${value}мм.` : mark}
        />

        <Line
          points={rotate ? pointAuxiliary.startAuxiliaryMirror : pointAuxiliary.startAuxiliary}
          stroke={"#7281C0"}
          strokeWidth={0.5}
        />
        <Line
          points={rotate ? pointAuxiliary.endAuxiliaryMirror : pointAuxiliary.endAuxiliary}
          stroke={"#7281C0"}
          strokeWidth={0.5}
        />
        <Arrow
          pointerAtBeginning
          points={rotate ? pointAuxiliary.pointArrowMirror : pointAuxiliary.pointArrow}
          fill="#64A989"
          stroke={"#64A989"}
          strokeWidth={0.7}
          opacity={0.5}
        />
      </Group>
    </Group>
  );
}
export default memo(Segment);
