import NavBar from "@/components/layout/NavBar";
import Header from "@/components/layout/Header";

import { Suspense } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" w-full h-screen  flex flex-col overflow-hidden ">
      <Suspense
        fallback={
          <div className=" w-full h-24 border-2 flex justify-center items-center">
            <span className="Mini_Loader"></span>
          </div>
        }
      >
        <Header />
      </Suspense>

    
        <div className=" flex h-full overflow-auto  ">
          <Suspense
            fallback={
              <div className=" flex justify-center items-center">
                <span className="Loader">Загружаем</span>
              </div>
            }
          >
            <div className=" sticky top-0">
              <NavBar />
            </div>
            <div className=" p-4 w-full">{children}</div>
          </Suspense>
        </div>
     
    </div>
  );
}
