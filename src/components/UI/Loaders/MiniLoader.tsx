'use client'
import style from './styleLoader.module.css'
import { useMiniLoader } from "../../../../store/storeMiniLoader";
import {memo} from 'react'

 function MiniLoader() {
  const visibleMiniLoader = useMiniLoader((state) => state.visible);

  return <span style={visibleMiniLoader ? { display: "block" } : { display: "none" }}  className={style.Mini_Loader}></span>;
}
export default memo(MiniLoader)