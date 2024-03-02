import FormTypicallyColorSchema from "@/components/form/FormTypicallyColorSchema/FormTypicallyColorSchema";
import FormConfigApp from "@/components/form/formConfigApp/FormConfigApp";
import React from "react";


export default function page({ params }: { params: { INN: string } }) {
  console.log(params);
  
  return (
    <div>
      <FormConfigApp />
      <FormTypicallyColorSchema />
    </div>
  );
}
