import { isError } from '@/shared/lib/IsError'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { TDataTablePrice, TPrice } from '../../../../../../../Server/Service/servicePrice/model/types/Types'
import { PriceDTO } from '../../../../../../../Server/Service/servicePrice/price.dto'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice/servicePrice'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const body = await request.json()

	const { nameTable, dataGeo } = body as {
		nameTable: string
		dataGeo: TNewDataGeoLocationDTO
	}
	if (!nameTable || typeof nameTable !== 'string' || nameTable.trim().length === 0) {
		return NextResponse.json({ error: 'Valid nameTable is required' }, { status: 400 })
	}
	const userId = MongoHelpers.stringToObjectId(dataGeo.user)
	if (userId === null) {
		return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 })
	}

	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.price)
	const permissionUser = await servicePermission.Permission(userId)
	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	const servicePrice = new ServicePrice(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const result = await Promise.all([
		servicePrice.addNewPrice(nameTable.trim().substring(0, 10)),
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])
	const error = result.filter((el) => isError(el))
	if (error.length != 0) {
		return NextResponse.json({ message: error[0].message }, { status: 500 })
	}
	const price: TPrice = {
		readonly: false,
		price: result[0] as TDataTablePrice,
	}
	const priceDTO = PriceDTO.createPriceDTO(price)
	return NextResponse.json(priceDTO, { status: 201 })
}
