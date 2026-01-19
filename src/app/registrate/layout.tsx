import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className=" flex justify-center items-center">
          <span className="Loader">Загружаем</span>
        </div>
      }
    >
      <div className=" w-5/6 flex items-center h-screen justify-center">{children}</div>
    </Suspense>
  );
}
