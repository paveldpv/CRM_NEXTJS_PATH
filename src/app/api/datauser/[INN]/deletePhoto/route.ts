import { NextRequest, NextResponse } from "next/server";
import ControllerUsers from "../../../../../../Controllers/Service/Users";

export async function POST(req: NextRequest, { params }: { params: { INN: number } }, res: NextResponse) {
  const INN = params.INN;
  const { idUser, fullPath } = (await req.json()) as { idUser: string; fullPath: string };
  const response = await ControllerUsers.deletePhoto(INN, idUser, fullPath);

  return NextResponse.json(response);
}
