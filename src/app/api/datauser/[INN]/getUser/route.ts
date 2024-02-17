import { TDBUser } from "@/Types/Types";
import { NextRequest, NextResponse } from "next/server";
import ControllerUsers from "../../../../../../Controllers/Controllers/Users";

export async function POST(
  req: NextRequest,
  { params }: { params: { INN: number } },
  res: NextResponse
) {
  const INN = params.INN;
  const {idUser} = (await req.json()) ;
  const response = await ControllerUsers.getUser(INN,idUser);

  

  return NextResponse.json(response);
}
