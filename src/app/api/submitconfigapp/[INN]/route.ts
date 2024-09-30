import { TConfigAPP } from '@/Types/subtypes/TAppearanceConfigApp'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceConfigApp } from '../../../../../Controllers/Service/serviceConfigApp'

export async function POST(
	req: NextRequest,
	{ params }: { params: { INN: string } },
	res: NextResponse
) {
	const INN = params.INN
	const requestData = await req.json()
	const { dataConfig } = requestData as {
		dataConfig: TConfigAPP
	}

	const serviceConfigApp = new ServiceConfigApp(INN)

	const response = await serviceConfigApp.updatePersonalConfig(dataConfig)

	return NextResponse.json(response || 'OK', { status: 200 })
}
