import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceRequisites } from '../../../../../../../Server/Service/serviceRequisites/serviceReqisites'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const url = new URL(request.url)
	const targetINN = url.searchParams.get('targetINN')
	const body = await request.json()
	const dataGeo = body as TNewDataGeoLocationDTO
	if (!targetINN?.trim()) {
		return NextResponse.json({ message: 'Missing targetINN parameter' }, { status: 400 })
	}
	const userId = MongoHelpers.stringToObjectId(dataGeo.user)
	if (!userId) {
		return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 })
	}
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const serviceRequisites = new ServiceRequisites(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		serviceRequisites.deletedRequisites(targetINN),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])

  const errors = result.filter(el => isError(el));
  if (errors.length > 0) {
    return NextResponse.json({ message: errors[0].message }, { status: 500 });
  }
  
  return NextResponse.json({ message: 'OK' }, { status: 200 });
	
}
