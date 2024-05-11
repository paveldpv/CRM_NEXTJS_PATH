import type { Metadata } from "next";
import ERROR_PAGE from "@/components/layout/ERROR_PAGE";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "произошла ошибка",
};

export default async function NotFound() {
  return <ERROR_PAGE />;
}
