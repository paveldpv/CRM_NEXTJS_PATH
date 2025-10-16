
import { NextRequest, NextResponse } from 'next/server'

import { TRequestPrevCalc } from '../../../../../../Server/Service/servicePrevCacl/model/types/Types'
import { ServicePrevCalc } from '../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'

export async function POST(req: NextRequest, { params }: { params: { INN: string } }, res: NextResponse) {
	const INN = params.INN
	const requestData = (await req.json()) as TRequestPrevCalc

	const servicePrevCalc = new ServicePrevCalc(INN)
	const saveRequest = await servicePrevCalc.saveRequest(requestData)

	return NextResponse.json(saveRequest)
}
