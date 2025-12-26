import { isError } from '@/shared/lib/IsError'
import { TNewDataGeoLocationDTO, TNewDetailDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceDetailDTO } from '../../../../../../../Server/Service/serviceDetails/detail.dto'
import { TDetail } from '../../../../../../../Server/Service/serviceDetails/model/types/Types'
import { ServiceDetails } from '../../../../../../../Server/Service/serviceDetails/serviceDetails'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const body = await request.json()
	const { data, dataGeo } = body as {
		data: TNewDetailDTO
		dataGeo: TNewDataGeoLocationDTO
	}
	const ids = MongoHelpers.stringsToObjectIdsTuple(data.order, dataGeo.user)
	if (ids === null) {
		return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 })
	}
	const [idOrder, idUser] = ids
	const serviceDetail = new ServiceDetails(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permission = await servicePermission.Permission(idUser)
	if (!permission) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const result = await Promise.all([
		serviceDetail.addDetailForOrder({ ...data, order: idOrder }),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: idUser }),
	])

	const error = result.filter((el) => isError(el))
	if (error.length != 0) {
		return NextResponse.json({ message: error[0].message }, { status: 500 })
	}
	const detailDTO = ServiceDetailDTO.createDetailDTO(result[0] as TDetail)
	return NextResponse.json(detailDTO, { status: 200 })
}
