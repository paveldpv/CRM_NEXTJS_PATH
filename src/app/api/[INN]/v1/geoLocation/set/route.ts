import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'

import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const data = (await request.json()) as TNewDataGeoLocationDTO
	const userId = MongoHelpers.stringToObjectId(data.user)
	if (userId === null) {
		return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 })
	}
	const service = new ServiceGeoLocation(INN)
	const result = await service.setDataLocation({ ...data, user: userId })

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

	return NextResponse.json({ message: 'OK' }, { status: 200 })
	
}
