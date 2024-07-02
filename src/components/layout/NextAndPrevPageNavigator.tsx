"use client";
import React, { memo, useMemo } from "react";
import { cn } from "../../../function/cn";
import { useRouter, usePathname } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  rangeList: number;
  currentRangeList :number
};
type TDataUrlNavigator = {
  range: number;
  splitData: string[];
  indexRangeOnList: number;
};
/**
 *
 * перелистывает станицу со списком элементов
 *
 *
 * 
 */

function NextAndPrevPageNavigator({ className, rangeList,currentRangeList, ...props }: Props) {
  const router = useRouter();
  const pathName = usePathname();

  const dataUr: TDataUrlNavigator = useMemo(() => {
    const splitData = pathName.split("/");
    const range = +splitData.filter((research) => {
      if (!isNaN(+research)) {
        return research;
      }
    })[0];
    return {
      range,
      splitData,
      indexRangeOnList: splitData.findIndex((el) => +el == range),
    };
  }, [pathName]);

  const nextPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let updateUrl =dataUr.splitData
    updateUrl[dataUr.indexRangeOnList]=`${dataUr.range+rangeList}`
    console.log(dataUr);
    
   // router.push(updateUrl.join('/'))


  };
  const prevPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let updateUrl =dataUr.splitData
    updateUrl[dataUr.indexRangeOnList]=`${dataUr.range-rangeList}`
    console.log(dataUr.range<=rangeList);
    
    //router.push(updateUrl.join('/'))
  };

  return (
    <div {...props} className={cn(" flex justify-around mt-2", className)}>
      <button      
        //? button prev page
        onClick={prevPage}
        disabled={dataUr.range>=rangeList }
        className=" rounded-lg text-4xl border-2 border-solid  border-menu_color  p-4 rounded-xs  hover:bg-color_header delay-100  duration-300"
        //   href={`${Number(range) - 5}/${PROCESS}/${ID_EMPLOYEE}`}
      >
        <FaAngleLeft />
      </button>
      <button
        //? button next page
        onClick={nextPage}
        disabled={dataUr.range<currentRangeList}
        className=" rounded-lg text-4xl border-2 border-solid  border-menu_color  p-4 rounded-xs  hover:bg-color_header delay-100  duration-300"
        //   href={`${Number(RANGE) + 5}/${PROCESS}/${ID_EMPLOYEE}`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
export default memo(NextAndPrevPageNavigator)
