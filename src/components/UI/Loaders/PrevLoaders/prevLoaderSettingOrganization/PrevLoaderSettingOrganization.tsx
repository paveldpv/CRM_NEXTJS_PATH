import style from './style.module.css'

export default function PrevLoaderSettingOrganization() {
  return (
    <div className=" border-2 border-solid border-menu_color w-full p-2 mt-2 rounded-md flex flex-col gap-5  ">
      <section className={`grid grid-cols-4 gap-5 ${style.loader}`}>
        <div className=" col-span-2   h-52  rounded-md  border-solid border-menu_color border-2"></div>
        <div className="  h-52  rounded-md  border-solid border-menu_color border-2"></div>
        <div className="   h-52   rounded-md border-solid border-menu_color border-2"></div>
      </section>
      <section className=" grid grid-cols-3 gap-5">
        <div className="  border-2 border-menu_color border-solid rounded-md  col-span-2  h-52 "></div>
        <div className="  border-2 border-menu_color border-solid rounded-md col-span-1  h-52 ">
          <div className="  h-24"></div>
          <hr className=" h-1 bg-menu_color mx-4" />
          <div className="  h-24"></div>
        </div>
      </section>
      <section>
        <div className=" border-2 border-solid border-menu_color rounded-md w-full  h-24 "></div>
      </section>
    </div>
  );
}
