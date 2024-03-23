import { Suspense } from "react";
import type {  Metadata } from "next";
import PrevLoaderSettingOrganization from "@/components/UI/Loaders/PrevLoaders/prevLoaderSettingOrganization/PrevLoaderSettingOrganization";

//export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: "Организация",
  description: "Настройки организации",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<PrevLoaderSettingOrganization />}><PrevLoaderSettingOrganization /></Suspense>
    </>
  );
}
