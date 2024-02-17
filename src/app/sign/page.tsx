import Auth from "@/components/form/auth/Auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AUTH",
  description: "sign MES",
};

export default function auth() {
  return (
    <>
      <Auth />
    </>
  );
}
