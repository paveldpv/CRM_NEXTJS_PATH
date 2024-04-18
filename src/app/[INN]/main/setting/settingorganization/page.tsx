import { cache } from "react";

import ProgressLoader from "@/components/UI/Loaders/ProgressLoader";
import DialogWindow from "@/components/additional/DialogWindow";

import FormAdminPanel from "@/components/form/formAdminPanel/FormAdminPanel";
import ControllerOrganization from "../../../../../../Controllers/Controllers/Organization";

import { TApprover } from "@/Types/customType";
import { TDataOrganization } from "@/Types/subtypes/TOrganization";
import ListAdmins from "@/components/form/formAdminPanel/ListAdmins";
import ControllerUsers from "../../../../../../Controllers/Controllers/Users";
import { TDBUser } from "@/Types/Types";

export type TFullDataSettingOrganization = {
  dataOrganization?: TApprover<TDataOrganization, "INN">;
  admins?: TDBUser[];
};

export const getDataOrganization = cache(
  async (INN: number): Promise<TFullDataSettingOrganization | undefined> => {
    const [dataOrganizationResult, dataUsersResult] = await Promise.allSettled([
      ControllerOrganization.getParamsOrganization(INN),
      ControllerUsers.getUsers(INN),
    ]);

    if (dataOrganizationResult.status === "rejected" || dataUsersResult.status === "rejected") return;

    const res: TFullDataSettingOrganization = {
      dataOrganization: dataOrganizationResult.value as TApprover<TDataOrganization, "INN">,
      admins: dataUsersResult?.value?.filter((user) => user.linksAllowed === "ADMIN") || undefined,
    };

    return res;
  }
);

export const revalidate = 10;

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
