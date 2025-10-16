import { NextRequest, NextResponse } from 'next/server'
import { ServicePrevCalc } from '../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'
import { ObjectId } from 'mongoose'

export async function POST(
	req: NextRequest,
	{ params }: { params: { INN: string } },
	res: NextResponse
) {
	const INN = params.INN
	const idRequest = (await req.json()) as ObjectId
	const servicePrevCalc = new ServicePrevCalc(INN)

	const response = await servicePrevCalc.deleteRequest(idRequest)

	return NextResponse.json(response)
}
