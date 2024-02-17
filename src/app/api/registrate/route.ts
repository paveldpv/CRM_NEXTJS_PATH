import { NextResponse, NextRequest } from "next/server";
import ControllerRegistrate from "../../../../Controllers/Controllers/Registrate";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await ControllerRegistrate.registrateNewOrganization(body);

  return NextResponse.json(result);
}
