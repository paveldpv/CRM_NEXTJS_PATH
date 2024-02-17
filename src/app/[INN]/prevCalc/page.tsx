import type { Metadata } from "next";
import FormPrevCalc from "@/components/form/formPrevCalc/FormPrevCalc";
import DialogWindow from "@/components/additional/DialogWindow";
import ProgressLoader from "@/components/UI/Loaders/ProgressLoader";

export const metadata: Metadata = {
  title: "предварительный расчет",
  description: "",
};

export default function page({ params }: { params: { INN: string } }) {
  const INN = Number(params.INN);

  console.log("🚀 ~ page ~ INN:", INN)
  return (
    <>
      <FormPrevCalc INN={INN} />
      <ProgressLoader />
      <DialogWindow />
    </>
  );
}
