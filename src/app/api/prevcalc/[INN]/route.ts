import { TRequestPrevCalc } from "@/Types/Types";
import { NextRequest, NextResponse } from "next/server";
import ControllerPrevCalc from "../../../../../Controllers/Service/PrevCalc";

export async function POST(req: NextRequest, { params }: { params: { INN: number } }, res: NextResponse) {
  const INN = params.INN;
  const data = (await req.json()) as TRequestPrevCalc;

  const saveRequest = await ControllerPrevCalc.saveRequest(INN, data);

  return NextResponse.json(saveRequest);
}
