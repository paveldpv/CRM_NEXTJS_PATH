import { TDBUser } from "@/Types/Types";
import { NextRequest, NextResponse } from "next/server";
import ControllerUsers from "../../../../../../Controllers/Service/Users";

export async function POST(req: NextRequest, { params }: { params: { INN: number } }, res: NextResponse) {
  const INN = params.INN;
  const dataUpdateUser = (await req.json()) as TDBUser;
  const response = await ControllerUsers.updateDataUser(INN, dataUpdateUser);

  console.log("🚀 ~ response :", response);

  return NextResponse.json(response);
}
