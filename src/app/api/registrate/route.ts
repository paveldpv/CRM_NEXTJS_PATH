import { NextRequest, NextResponse } from 'next/server'

import { TFormRegistrate } from '@/Types/Types'
import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { ServiceRegistrated } from '../../../../Controllers/Service/serviceRegistrate'

export async function POST(req: NextRequest) {
	const { data, dataGeo } = (await req.json()) as {
		data: TFormRegistrate
		dataGeo: TGeoLocation
	}

	const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
	dataGeo.ip = ip

	const serviceRegistrated = new ServiceRegistrated(data, dataGeo)
	const resultRegistrated =
		await serviceRegistrated.registratedNewOrganization()

	return NextResponse.json(resultRegistrated || 'OK', { status: 200 })
}
