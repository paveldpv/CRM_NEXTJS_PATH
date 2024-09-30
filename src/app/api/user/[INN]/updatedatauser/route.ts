import { TDBUser } from "@/Types/Types";
import { NextRequest, NextResponse } from "next/server";
import { ServiceUsers } from '../../../../../../Controllers/Service/serviceUser';

export async function POST(req: NextRequest, { params }: { params: { INN: string } }, res: NextResponse) {
  const INN = params.INN;
  
  const dataUpdateUser = (await req.json()) as TDBUser;

  const serviceUser = new ServiceUsers(INN)
  const response = await serviceUser.updateDataUser(dataUpdateUser)  

  console.log("🚀 ~ response update user data :", response);

  return NextResponse.json(response);
}
