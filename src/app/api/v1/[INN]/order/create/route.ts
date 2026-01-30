import { isError } from '@/shared/lib/IsError'
import { TNewDataGeoLocationDTO, TNewOrderDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { TNewOrder, TOrderFullInfo } from '../../../../../../../Server/Service/serviceOrder/model/types/Types'
import { ServiceOrder } from '../../../../../../../Server/Service/serviceOrder/serviceOrder'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceOrderFullInfo } from '../../../../../../../Server/Service/serviceOrder/order.dto'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()

	const { data, dataGeo } = body as {
		data: TNewOrderDTO
		dataGeo: TNewDataGeoLocationDTO
	}
	const idsToConvert = [dataGeo.user, data.CounterParty, data.acceptedOfCargoEmployeeId].filter(Boolean) // убираем пустые

	const objectIds = MongoHelpers.stringsToObjectIdsTuple(...idsToConvert)
	if (objectIds === null) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}
	const [userId, counterpartyId, employeeId] = objectIds

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}
	const serviceOrder = new ServiceOrder(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const orderData: TNewOrder = {
		...data,
		CounterParty: counterpartyId,
		acceptedOfCargoEmployeeId: employeeId,
	}
	const result = await Promise.all([
		serviceOrder.createOrder(orderData),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])

	const error = result.filter((el) => isError(el))
	if (error.length != 0) {
		return NextResponse.json({ message: error[0].message }, { status: 500 })
	}
	const orderFullInfoDTO = ServiceOrderFullInfo.createOrderFullInfoDTO(result[0] as TOrderFullInfo)
	return NextResponse.json(orderFullInfoDTO, { status: 201 })
}
