import style from "./stylesPreLoader.module.css";

export default function PrevLoaderSettingOrganization() {
  return (
    <div className=" style_border  w-full p-2 mt-2  flex flex-col gap-5  ">
      <section className="grid grid-cols-4 gap-5 ">
        <div className={`col-span-2  h-60  style_border ${style.loader}`}></div>
        <div className={`  style_border ${style.loader}`}></div>
        <div className={`   style_border ${style.loader}`}></div>
      </section>
      <section className=" grid grid-cols-3 gap-5 ">
        <div className={`style_border col-span-2   ${style.loader} `}></div>
        <div className={`style_border col-span-1  `}>
          <div className={` h-24 mt-1 mx-2 ${style.loader}`}></div>
          <hr className=" h-1 mt-2 bg-menu_color mx-4" />
          <div className={`  h-20 mt-2 mx-2   ${style.loader}`}></div>
          <hr className=" h-1 mt-2 bg-menu_color mx-4" />
          <div className="grid grid-cols-4 gap-3 mb-2">
            <div className={`h-20 mt-2 mx-2  col-span-3 ${style.loader}`}></div>
            <div className={`h-20 mt-2 mx-2   ${style.loader}`}></div>
          </div>
        </div>
      </section>
      <section>
        <div className={` style_border w-full  h-24 ${style.loader} `}></div>
      </section>
    </div>
  );
}
