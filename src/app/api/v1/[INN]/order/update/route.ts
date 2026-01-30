import { TNewDataGeoLocationDTO, TOrderDTO } from '@/shared/model/types'
import { Types } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceOrder } from '../../../../../../../Server/Service/serviceOrder/serviceOrder'
import { isError } from '@/shared/lib/IsError'

export async function PUT(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { data, dataGeo } = body as {
		data: TOrderDTO
		dataGeo: TNewDataGeoLocationDTO
	}
	const idsToConvert = [
		data._id, // ID заказа
		data.CounterParty, // ID контрагента
		data.acceptedOfCargoEmployeeId, // ID сотрудника
		dataGeo.user, // ID пользователя из геоданных
		...(data.details || []), // массив ID деталей
	]
	const objectIds = MongoHelpers.stringsToObjectIdsTuple(...idsToConvert)
	if (objectIds === null) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}

	const [orderId, counterpartyId, employeeId, userId, ...detailIds] = objectIds

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const orderDataForService = {
		...data,
		_id: orderId,
		CounterParty: counterpartyId,
		acceptedOfCargoEmployeeId: employeeId,
		details: detailIds as Types.ObjectId[],
	}
	const serviceOrder = new ServiceOrder(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result= await Promise.all([
		serviceOrder.updateOrder(orderDataForService),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])

  const error = result.filter(el=>isError(el))
  if(error.length!=0){
    return NextResponse.json(
      { message: error[0].message },
      { status: 500 }
    )
  }
  return NextResponse.json(
    { message: 'OK' },
    { status: 200 }
  )
	
}
