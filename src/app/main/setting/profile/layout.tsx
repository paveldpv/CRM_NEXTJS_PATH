import { Suspense } from "react";
import type { Metadata } from "next";
import PrevLoaderProfile from "@/components/UI/Loaders/PrevLoaders/PrevLoaderProfile";

import ListLinks from "@/components/layout/ListLinks";

export const metadata: Metadata = {
  title: "Профиль",
  description: "Настройки профиля",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<PrevLoaderProfile />}>{children}</Suspense>
    </>
  );
}
