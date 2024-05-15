import Auth from "@/components/form/auth/Auth";
import { Metadata } from "next";
import DialogWindow from "@/components/additional/DialogWindow";

export const metadata: Metadata = {
  title: "AUTH",
  description: "sign MES",
};

export default function auth() {
  return (
    <>
      <Auth />
      <DialogWindow/>
    </>
  );
}
