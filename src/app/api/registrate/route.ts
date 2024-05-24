import { NextResponse, NextRequest } from "next/server";

import ServiceRegistrate from "../../../../Controllers/Service/Registrate";
import { TDBUser } from "@/Types/Types";
import { TGeoLocation } from "@/Types/subtypes/TGeoLocation";

export async function POST(req: NextRequest) {
  const { data, dataGeo } = (await req.json()) as { data: TDBUser; dataGeo: TGeoLocation };

  const ip = (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  dataGeo.ip = ip;

  const result = await ServiceRegistrate.registrateNewOrganization(data, dataGeo);

  return NextResponse.json(result);
}
