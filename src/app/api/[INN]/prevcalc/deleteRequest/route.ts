import { NextRequest, NextResponse } from 'next/server'
import ControllerPrevCalc from '../../../../../../Server/Service/servicePrevCalc'

export async function POST(
	req: NextRequest,
	{ params }: { params: { INN: number } },
	res: NextResponse
) {
	const INN = params.INN
	const idRequest = (await req.json()) as string

	const response = await ControllerPrevCalc.deleteRequest(INN, idRequest)

	return NextResponse.json(response)
}
