import { NextRequest, NextResponse } from "next/server";
import ControllerPrevCalc from "../../../../../../Controllers/Controllers/PrevCalc";

export async function GET(req: NextRequest, { params }: { params: { INN: number } }, res: NextResponse) {
  const INN = params.INN;
  const dataResponse = await ControllerPrevCalc.getAllRequest(INN);
  return NextResponse.json(dataResponse);
}
