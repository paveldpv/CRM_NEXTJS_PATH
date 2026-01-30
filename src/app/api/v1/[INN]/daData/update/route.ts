import { isError } from '@/shared/lib/IsError'
import { TGeolLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { serviceDaDataOrganizationDTO } from '../../../../../../../Server/Service/serviceDaData/daDataOrganization.dto'
import { ServiceDaDataOrganization } from '../../../../../../../Server/Service/serviceDaData/serviceDaDataOrganization'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { TDaDataOrganization } from '../../../../../../../Server/Service/serviceDaData/model/types/Type'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()
	const { INNqueryOrganization, idQueryOrganization, dataGeo } = body as {
		INNqueryOrganization: string
		idQueryOrganization: string
		dataGeo: TGeolLocationDTO
	}
	const ids = MongoHelpers.stringsToObjectIdsTuple(idQueryOrganization, dataGeo.user)
	if (ids == null) {
		return NextResponse.json({ message: 'not valid ID user' }, { status: 400 }) // мне не нравиться что мы после проверки если id плохие делаем возврат оишбки - этот код повторяется
	}
	const [_idQueryOrganization, idUser] = ids
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.order)
	const permissionUser = servicePermission.Permission(idUser)
	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied' }, { status: 403 })
	}
	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const serviceDaData = new ServiceDaDataOrganization(INN)
	const result = await Promise.all([
		serviceGeoLocation.setDataLocation({ ...dataGeo, user: idUser }),
		serviceDaData.updateDaDataByINN(_idQueryOrganization, INNqueryOrganization),
	])
	const error = result.filter((el) => isError(el))
	if (error.length != 0) {
		return NextResponse.json({ message: error[0].message }, { status: 500 })
	}
	const daData = result[1] as TDaDataOrganization
	const daDataDTO = serviceDaDataOrganizationDTO.createDaDataOrganizationDTO(daData)

	return NextResponse.json(daDataDTO, { status: 200 })
}
