import { NextRequest, NextResponse } from 'next/server'


import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { ServiceRegistrated } from '../../../../../Server/Service/serviceRegistrate/serviceRegistrate'
import { TFormRegistrate } from '@/shared/model/types/Types'


export async function POST(req: NextRequest) {
	const { data, dataGeo } = (await req.json()) as {
		data: TFormRegistrate
		dataGeo: Omit<TGeoLocation, 'date'|'idEmployee'>
	}

	const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
	dataGeo.ip = ip

	const serviceRegistrated = new ServiceRegistrated(data, dataGeo)
	const resultRegistrated = await serviceRegistrated.registratedNewOrganization()

	return NextResponse.json(resultRegistrated || 'OK', { status: 200 })
}
