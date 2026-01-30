import { TDataTablePriceDTO, TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice/servicePrice'
import { isError } from '@/shared/lib/IsError'

export async function PUT(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { dataTable, dataGeo } = body as {
		dataTable: TDataTablePriceDTO
		dataGeo: TNewDataGeoLocationDTO
	}

	const ids = MongoHelpers.stringsToObjectIdsTuple(
		dataTable._id, // ID прайс-листа
		dataGeo.user // ID пользователя
	)

	if (ids === null) {
		return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
	}

	const [priceId, userId] = ids

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.price)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const priceDataForService = {
		...dataTable,
		_id: priceId,
	}

	const servicePrice = new ServicePrice(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		servicePrice.updatePrice(priceDataForService),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])
  const error = result.filter(el=>isError(el))
  if(error.length!=0){
     return NextResponse.json(
      { message: error[0].message},
      { status: 500 }
    )
  }
  return NextResponse.json('OK', { status: 200 })

}
