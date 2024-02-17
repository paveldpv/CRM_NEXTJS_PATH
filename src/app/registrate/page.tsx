import FormRegistrate from "@/components/form/registrate/FormRegistrate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrate",
  description: "create new MES user (admin user)",
};

export default function page() {
  
  return (
    <>
      <FormRegistrate />
    </>
  );
}
