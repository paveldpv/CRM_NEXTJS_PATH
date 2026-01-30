import { isError } from '@/shared/lib/IsError'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceSession } from '../../../../../../../Server/Service/serviceSession/serviceSession'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { dataGeo } = body as {
		dataGeo: TNewDataGeoLocationDTO
	}
	const userId = MongoHelpers.stringToObjectId(dataGeo.user)
	if (!userId) {
		return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 })
	}

	const serviceSession = new ServiceSession(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		serviceSession.addSession(userId),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])

	const errors = result.filter((el) => isError(el))
	if (errors.length > 0) {
		return NextResponse.json({ message: errors[0].message }, { status: 500 })
	}
	return NextResponse.json(result[0], { status: 201 })
}
