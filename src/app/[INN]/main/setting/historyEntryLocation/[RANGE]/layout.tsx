import { Suspense } from "react";
import type { Metadata } from "next";
import PrevLoaderHistoryEntryLocation from "@/components/UI/Loaders/PrevLoaders/PrevLoaderHistoryEntryLocation";



export const metadata: Metadata = {
  title: "История входа в приложение",
  description: "История входа в приложение",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<PrevLoaderHistoryEntryLocation/>}>{children}</Suspense>
    </>
  );
}
