import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <div className=" flex justify-center items-center">
            <span className="Loader">Загуржаем</span>
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
