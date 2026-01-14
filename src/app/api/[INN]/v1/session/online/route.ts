import { NextRequest, NextResponse } from 'next/server'
import { ServiceSession } from '../../../../../../../Server/Service/serviceSession/serviceSession'

import { isError } from '@/shared/lib/IsError'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const serviceSession = new ServiceSession(INN)
	const result = await serviceSession.getOnlineSession()
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

	
	const resultDTO = result?.map((el) => el.toString())
	return NextResponse.json(resultDTO, { status: 200 })
}
