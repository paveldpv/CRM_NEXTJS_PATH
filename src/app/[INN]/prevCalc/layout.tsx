import { Suspense } from "react";
import LoaderPrevCalc from "@/components/UI/Loaders/LoaderPrevCalc";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full h-screen  flex justify-center items-center ">
      <div className="  pt-7 pb-7  w-10/12 h-5/6  overflow-hidden bg-color_header bg-opacity-75 rounded-md">
        <Suspense fallback={<LoaderPrevCalc/>}>{children}</Suspense>
      </div>
    </div>
  );
}
