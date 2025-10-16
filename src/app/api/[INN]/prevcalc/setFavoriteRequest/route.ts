import { ObjectId } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { ServicePrevCalc } from '../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'


export async function POST(
	req: NextRequest,
	{ params }: { params: { INN: string } },
	res: NextResponse
) {
	const INN = params.INN
	const { idRequest, isFavorite } = await req.json() as {idRequest:ObjectId,isFavorite:boolean}
	const servicePrevCalc = new ServicePrevCalc(INN)
	const dataResponse = await servicePrevCalc.setFavoriteRequest(idRequest,isFavorite)
	return NextResponse.json(dataResponse)
}
