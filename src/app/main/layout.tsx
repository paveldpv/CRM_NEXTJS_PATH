import NavBar from "@/components/layout/NavBar";
import Header from "@/components/layout/Header";

import { Suspense } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full h-screen  flex flex-col  ">
      <Suspense
        fallback={
          <div className=" w-full h-24 border-2 flex justify-center items-center">
            <span className="Mini_Loader"></span>
          </div>
        }
      >
        <Header />
      </Suspense>

      <div className=" h-full ">
        <div className=" flex h-full">
          <Suspense
            fallback={
              <div className=" flex justify-center items-center">
                <span className="Loader">Загуржаем</span>
              </div>
            }
          >
            <NavBar />
            <div className=" p-4 w-full">{children}</div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
