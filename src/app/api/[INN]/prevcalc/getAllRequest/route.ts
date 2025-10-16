import { NextRequest, NextResponse } from 'next/server'
import { ServicePrevCalc } from '../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'


export async function GET(
	req: NextRequest,
	{ params }: { params: { INN: string } },
	res: NextResponse
) {
	const INN = params.INN
	const servicePrevCalc =  new ServicePrevCalc(INN)
	const dataResponse = await servicePrevCalc.getRequestPrevCalc()
	return NextResponse.json(dataResponse)
}
