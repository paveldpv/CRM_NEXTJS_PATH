import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice/servicePrice'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const { searchParams } = new URL(request.url)
	const priceId = searchParams.get('_id')
	if (!priceId) {
		return NextResponse.json({ error: 'Price ID (_id) query parameter is required' }, { status: 400 })
	}

	const dataGeo = (await request.json()) as TNewDataGeoLocationDTO

	// Validate IDs
	const ids = MongoHelpers.stringsToObjectIdsTuple(priceId, dataGeo.user)

	if (ids === null) {
		return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
	}
	const [objectPriceId, userId] = ids

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.price)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}
	const servicePrice = new ServicePrice(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		servicePrice.deletedPrice(objectPriceId),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])
  const error = result.filter(el=>isError(el))
  if(error.length!=0){
    return NextResponse.json(
      { message: error[0].message },
      { status: 500 }
    )
  }
  return NextResponse.json('OK', { status: 200 })

	
}
