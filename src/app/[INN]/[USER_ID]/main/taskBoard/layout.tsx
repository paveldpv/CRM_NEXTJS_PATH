import PrevLoaderTaskBoard from '@/entities/taskBoard/ui/PrevLoaderTaskBoard'
import { Metadata } from 'next'
import { Suspense } from "react";

export const metadata: Metadata = {
	title: 'Задачи',
	description: 'Задачи'
}



export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <PrevLoaderTaskBoard/>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
