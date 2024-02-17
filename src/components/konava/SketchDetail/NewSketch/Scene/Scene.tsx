"use client";
import Konva from "konva";
import uniqid from "uniqid";

import { TLine, TParamsSegment } from "@/Types/Types";
import { KonvaEventObject } from "konva/lib/Node";

import { useState, useCallback, memo, useRef, useMemo } from "react";

import { Stage, Layer, Line } from "react-konva";
import Grid from "./Grid";
import Segment from "./Segment";

export type TSense = {
  setCurrentLines?: React.Dispatch<React.SetStateAction<TLine[]>>;
  setCurrentParams?: React.Dispatch<React.SetStateAction<TParamsSegment[]>>;
  previewEntity?: boolean;
  widthScene: number;
  heightScene: number;
  currentLines: TLine[];
};

function Scene({
  widthScene,
  heightScene,
  currentLines,
  setCurrentLines,
  previewEntity = false,
  setCurrentParams,
}: TSense) {
  const pointRef = useRef<Konva.Circle>(null);
  const lineRef = useRef<Konva.Line>(null);
  const [flagPaint, setFlagPaint] = useState<{
    flag: boolean;
    initialX?: number;
    initialY?: number;
  }>({ flag: false });

  const mouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const point = pointRef.current;
    const line = lineRef.current;
    const positionCursor = {
      x: Math.ceil(e.evt.clientX / 25) * 25 - 100,
      y: Math.ceil(e.evt.clientY / 25) * 25 - 150,
    };
    point?.setPosition(positionCursor);

    if (!flagPaint.flag) return;

    line?.points([flagPaint.initialX! - 100, flagPaint.initialY! - 150, positionCursor.x, positionCursor.y]);
  };

  const clickStage = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button != 0) return;
    setFlagPaint({
      flag: true,
      initialX: Math.ceil(e.evt.clientX / 25) * 25,
      initialY: Math.ceil(e.evt.clientY / 25) * 25,
    });
    // const point = pointRef.current;
    // point?.setPosition({x:Math.round(e.evt.clientX / 25) * 25,y:Math.round(e.evt.clientY / 25) * 25});
  };

  const upMouse = () => {
    const lengthArrLines = currentLines.length;
    console.log(currentLines[currentLines.length - 1]?.mark);
    const lastIndexMark =
      lengthArrLines !== 0 ? +currentLines[lengthArrLines - 1].mark.split("-")[1] + 1 : currentLines.length + 1;

    setFlagPaint({ flag: false });
    const endIndexLine = currentLines.length + 1;

    const newParams: TParamsSegment = {
      idLine: uniqid(),
      mark: `X-${lastIndexMark}`,
      value: 0,
      description: `X-${lastIndexMark}`,
    };

    const points = lineRef.current?.points();

    if (!points || points.length === 0) return;
    if (points[0] - points[2] == 0 && points[1] - points[3] == 0) return;

    const newSegment: TLine = {
      idLine: newParams.idLine,
      points: points,
      mark: newParams.mark,
      value: 0,
    };

    setCurrentParams && setCurrentParams((state) => [...state, newParams]);
    setCurrentLines && setCurrentLines((segments) => [...segments, newSegment]);

    setFlagPaint({ flag: false });
  };

  const leaveMouse = useCallback(() => {
    setFlagPaint({ flag: false });
  }, [currentLines]);

  return (
    <Stage
      scale={previewEntity ? { x: 0.23, y: 0.23 } : { x: 1, y: 1 }}
      onContextMenu={(e) => e.evt.preventDefault()}
      onMouseUp={upMouse}
      onMouseLeave={leaveMouse}
      onMouseDown={clickStage}
      width={widthScene}
      height={heightScene}
      onMouseMove={mouseMove}
      className={!previewEntity ? " cursor-crosshair":''}
    >
      <Layer>
        {flagPaint.flag && <Line ref={lineRef} dash={[10, 10]} strokeWidth={5} stroke={"#38a169"} />}
        {currentLines.length != 0 &&
          currentLines.map((line, indexLine) => (
            <Segment
              previewEntity={previewEntity}
              idLine={line.idLine}
              value={line.value}
              points={line.points}
              mark={line.mark}
              key={indexLine}
              setCurrentLines={setCurrentLines}
              setCurrentParams={setCurrentParams}
            />
          ))}
        {!previewEntity && (
          <Grid cell={25} widthScene={widthScene} heightScene={heightScene} pointRef={pointRef} />
        )}
      </Layer>
    </Stage>
  );
}
export default Scene;
