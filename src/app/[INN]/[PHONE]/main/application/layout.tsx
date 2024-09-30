import { Suspense } from "react";
import StaticLoader from "@/components/UI/Loaders/staticLoaders/StaticLoader/StaticLoader";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <div className=" flex justify-center items-center">
            <StaticLoader/>
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
