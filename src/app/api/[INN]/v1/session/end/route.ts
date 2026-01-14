import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceSession } from '../../../../../../../Server/Service/serviceSession/serviceSession'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { idUser, dataGeo } = body as {
		idUser: string
		dataGeo: TNewDataGeoLocationDTO
	}
	const ids = MongoHelpers.stringsToObjectIdsTuple(idUser, dataGeo.user)
	if (!ids) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}
	const [userId, geoUserId] = ids
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.employee)
	const permission = servicePermission.Permission(geoUserId)
	if (!permission) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const serviceSession = new ServiceSession(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		serviceSession.endSession(userId),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: geoUserId }),
	])

  const errors = result.filter(el => isError(el));
  if (errors.length > 0) {
    return NextResponse.json({ message: errors[0].message }, { status: 500 });
  }

  return NextResponse.json({ message: 'OK' }, { status: 200 });

}
