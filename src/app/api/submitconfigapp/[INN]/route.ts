import { NextResponse, NextRequest } from "next/server";
import { TConfigAPP } from "@/Types/Types";
import ControllerConfigApp from "../../../../../Controllers/Service/ConfigApp";

export async function POST(req: NextRequest, { params }: { params: { INN: string } }, res: NextResponse) {
  const INN = params.INN;

  const { idUser, dataConfig } = (await req.json()) as { idUser: string; dataConfig: TConfigAPP };
  const updateConfigApp = await ControllerConfigApp.updateConfigApp(+INN, idUser, dataConfig);

  console.log("🚀 ~ POST ~ updateConfigApp :", updateConfigApp);

  if (!updateConfigApp) {
    return NextResponse.json({
      status: 500,
    });
  }

  return NextResponse.json({ ...updateConfigApp, status: 200 });
}
