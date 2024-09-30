import { NextRequest, NextResponse } from "next/server";
import { ServiceUsers } from '../../../../../../Controllers/Service/serviceUser';

export async function POST(req: NextRequest, { params }: { params: { INN: string } }, res: NextResponse) {
  const INN = params.INN;
  const requestData = await req.json()
  const { idUser, fullPath } = requestData as { idUser: string; fullPath: string };
  const serviceUser = new ServiceUsers(INN)
  const response  = await serviceUser.deletedPhotoUser(idUser,fullPath)
 

  return NextResponse.json(response);
}
