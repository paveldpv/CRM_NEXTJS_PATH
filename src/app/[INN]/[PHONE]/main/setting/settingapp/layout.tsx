import React,{ Suspense } from 'react'; 
import type { Metadata } from "next";
import PrevLoaderSettingApp from '@/components/UI/Loaders/PrevLoaders/PrevLoaderSettingApp'




export const metadata: Metadata = {
  title: "приложение",
  description: "Настройки приложения",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<PrevLoaderSettingApp/>}>{children}</Suspense>
    </>
  );
}
