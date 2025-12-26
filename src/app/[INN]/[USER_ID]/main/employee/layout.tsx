
import PrevLoaderEmployee from '@/entities/employee/ui/PrevLoaderEmployee'
import { Suspense } from "react";


export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <PrevLoaderEmployee/>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
