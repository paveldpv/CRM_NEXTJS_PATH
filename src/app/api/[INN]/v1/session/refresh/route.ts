import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceSession } from '../../../../../../../Server/Service/serviceSession/serviceSession'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()
	const { refreshToken } = body as {
		refreshToken: string
	}

	if (!refreshToken?.trim()) {
		return NextResponse.json(
			{
				message: 'Refresh token is required',
				code: 'REFRESH_TOKEN_REQUIRED',
			},
			{ status: 400 }
		)
	}
	const serviceSession = new ServiceSession(INN)
	const result = await serviceSession.getNewJWTToken(refreshToken)

	if (isError(result)) {
		return NextResponse.json(
			{
				message: 'Refresh token expired',
				code: 'REFRESH_TOKEN_EXPIRED',
				requiresReauth: true,
			},
			{ status: 401 }
		)
	}

	return NextResponse.json(result, { status: 200 })
}
