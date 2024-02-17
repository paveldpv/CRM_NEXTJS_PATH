import { TDataOrganization } from "@/Types/Types";
import ProgressLoader from "@/components/UI/Loaders/ProgressLoader";
import DialogWindow from "@/components/additional/DialogWindow";
import HelpInformerModalWindow from "@/components/additional/HelpInformerModalWindow";
import FormAdminPanel from "@/components/form/formAdminPanel/FormAdminPanel";
import ControllerOrganization from "../../../../../Controllers/Controllers/Organization";

export async function getDataOrganization(INN: number): Promise<TDataOrganization | undefined|null> {
  console.log("INN",INN);
  
  return await ControllerOrganization.getParamsOrganization(INN);
}

export default async function page() {
  const dataOrganization = await getDataOrganization(1);

  console.log("🚀 ~ page ~ dataOrganization :", dataOrganization )
  
  return (
    <div>
      {/* <FormAdminPanel INN={Number(params.INN)} data={dataOrganization} /> */}
      <ProgressLoader />
      <DialogWindow />
      {/* <HelpInformerModalWindow /> */}
    </div>
  );
}
