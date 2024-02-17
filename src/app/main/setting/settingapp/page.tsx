import FormTypicallyColorSchema from "@/components/form/FormTypicallyColorSchema/FormTypicallyColorSchema";
import FormConfigApp from "@/components/form/formConfigApp/FormConfigApp";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <FormConfigApp />
      <FormTypicallyColorSchema />
    </div>
  );
}
