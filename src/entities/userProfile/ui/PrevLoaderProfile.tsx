import React from 'react'
import style from "./stylesPreLoader.module.css";


export default function PrevLoaderProfile() {
  return (
    <div className=" style_border  w-full p-2 mt-2  flex flex-col gap-5  ">
      <section className=' grid grid-cols-3 mt-2 mb-2 gap-4'>
       <section className=' col-span-2 flex flex-col gap-2'>
        <div className={`   h-20 style_border ${style.loader}`}></div>
        <div className={` h-20 style_border ${style.loader}`}></div>
        <div className={` h-20 style_border ${style.loader}`}></div>
        <div className={` h-20 style_border ${style.loader}`}></div>
        <div className={` h-20 style_border ${style.loader}`}></div>
        <div className={` h-20 style_border ${style.loader}`}></div>
        <div className={` h-20 style_border ${style.loader}`}></div>
       </section>
       <section className=' col-span-1'>
        <div className={`h-full style_border ${style.loader}`}></div>
       </section>
      </section>      
    </div>
  )
}