import { NextRequest, NextResponse } from 'next/server'
import ControllerPrevCalc from '../../../../../../Server/Service/servicePrevCalc'

export async function POST(
	req: NextRequest,
	{ params }: { params: { INN: number } },
	res: NextResponse
) {
	const INN = params.INN
	const { idRequest, isFavorite } = await req.json()
	const dataResponse = await ControllerPrevCalc.setFavoriteRequest(
		INN,
		idRequest,
		isFavorite
	)
	return NextResponse.json(dataResponse)
}
