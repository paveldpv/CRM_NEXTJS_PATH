import { getServerSession } from "next-auth";

import authConfig from "../../../../config/authConfig";
import { TDBUser } from "@/Types/Types";

import ControllerConfigApp from "../../../../Controllers/Controllers/ConfigApp";
import Wrapper from "@/components/layout/Wrapper";
import Link from "next/link";
import { Session } from "next-auth";
import { TConfigAPP } from "@/Types/subtypes/TAppearanceConfigApp";

async function getConfigApp(idUSer: string, INN: Number): Promise<TConfigAPP | null> {
  const config: TConfigAPP | null = await ControllerConfigApp.getConfig(INN, idUSer);

  return config;
}

export default async function page() {
  const session = (await getServerSession(authConfig)) as { dataSessionUser: TDBUser } & Session;

  const [user, dataSessionUser]: [any | undefined, TDBUser] = [session?.user, session?.dataSessionUser];

  const configApp = (await getConfigApp(dataSessionUser.idUser, dataSessionUser.INN)) as {
    [index: string]: Partial<TConfigAPP>;
  };

  if (configApp !== null && dataSessionUser !== null) {
    return <Wrapper dataConfigApp={configApp} dataUser={dataSessionUser} />;
  } else {
    <div className=" bg-slate-600">
      <Link className=" text-6xl bg-slate-700" href={"/sign"}>
        вход не выполнен
      </Link>
    </div>;
  }
}
