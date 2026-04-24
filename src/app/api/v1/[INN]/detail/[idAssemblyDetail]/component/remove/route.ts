import { isError } from '@/shared/lib/IsError'
import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceDetails } from '../../../../../../../../../Server/Service/serviceDetails/serviceDetails'
import { ServiceGeoLocation } from '../../../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ROOT_LINK } from '../../../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'

export async function POST(request: NextRequest, { params }: { params: { INN: string; idAssembly: string } }) {
	const { INN, idAssembly } = params
	const body = await request.json()

	const { idDetail, dataGeo } = body as {
		idDetail: string
		dataGeo: TNewDataGeoLocationDTO
	}

	
	if (!idAssembly || !idDetail || !dataGeo.user) {
		return NextResponse.json({ message: 'idAssembly, idDetail, and dataGeo.user are required' }, { status: 400 })
	}

	
	const ids = MongoHelpers.stringsToObjectIdsTuple(idAssembly, idDetail, dataGeo.user)
	if (ids == null) {
		return NextResponse.json({ message: 'One or more IDs have invalid format' }, { status: 400 })
	}

	const [assemblyId, detailId, userId] = ids

	
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permission = await servicePermission.Permission(userId)
	if (!permission) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}

	
	const serviceDetail = new ServiceDetails(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		serviceDetail.removeComponentAssemblyDetail(assemblyId, detailId), // ← сюда мы доделаем
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: userId }),
	])

	const errors = result.filter(isError)
	if (errors.length > 0) {
		return NextResponse.json({ message: errors[0].message }, { status: 500 })
	}

	return NextResponse.json({ message: 'OK' }, { status: 200 })
}
