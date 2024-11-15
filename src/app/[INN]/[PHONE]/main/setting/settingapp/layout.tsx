import React,{ Suspense } from 'react'; 
import type { Metadata } from "next";
import PrevLoaderSettingApp from '@/entities/configApp/ui/PrevLoaderSettingApp'





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
