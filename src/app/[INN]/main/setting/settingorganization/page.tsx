import { TDBUser, TDataOrganization } from "@/Types/Types";
import ProgressLoader from "@/components/UI/Loaders/ProgressLoader";
import DialogWindow from "@/components/additional/DialogWindow";

import FormAdminPanel from "@/components/form/formAdminPanel/FormAdminPanel";
import ControllerOrganization from "../../../../../../Controllers/Controllers/Organization";
import ControllerUsers from "../../../../../../Controllers/Controllers/Users";
import { TApprover } from "@/Types/customType";

export type TFullDataSettingOrganization = {
  //dataOrganization: Partial<TDataOrganization>;
  listAdmins: TDBUser[];
  dataOrganization: TApprover<TDataOrganization,"INN">;
  
};

export async function getDataOrganization(INN: number): Promise<TFullDataSettingOrganization | undefined> {
  const dataOrganization = await ControllerOrganization.getParamsOrganization(INN);
  if (!dataOrganization) return;

  const listAdmins = (await ControllerUsers.getUsers(INN))?.filter((user) => user.linksAllowed === "ADMIN");
  if (!listAdmins) return;
  return {
    dataOrganization,
    listAdmins,
  };
}

export default async function page({ params }: { params: { INN: string } }) {
  const dataOrganization = await getDataOrganization(Number(params.INN));
  

  return (
    <div>
      {dataOrganization ? (
        <>
          <FormAdminPanel INN={Number(params.INN)} data={dataOrganization} />
          <ProgressLoader />
          <DialogWindow />
        </>
      ) : (
        <>
          <h2>ошибка загрузки данные </h2>
        </>
      )}
    </div>
  );
}
