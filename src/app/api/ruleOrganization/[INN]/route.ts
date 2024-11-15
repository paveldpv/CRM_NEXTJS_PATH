import { TFullDataSettingOrganization } from '@/app/[INN]/[PHONE]/main/setting/settingorganization/page'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TDataOrganization } from '@/shared/model/types/subtypes/TOrganization'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceGeoLocation } from '../../../../../Server/Service/serviceGeoLocation'
import { ServiceRequisites } from '../../../../../Server/Service/serviceReqisites'
import { ServiceRuleOrganization } from '../../../../../Server/Service/serviceRuleOrganization'
import { ServiceUsers } from '../../../../../Server/Service/serviceUser'
import { isError } from '../../../../shared/lib/IsError'

export async function POST(req: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const requestData = await req.json()
	const { data, dataGeo } = requestData as {
		data: TFullDataSettingOrganization
		dataGeo: Omit<TGeoLocation, 'date'>
	}
	const serviceUser = new ServiceUsers(INN)
	const adminsInfo = await serviceUser.getUserById(dataGeo.idEmployee)
	if (isError(adminsInfo)) {
		return NextResponse.json(adminsInfo, { status: 404 })
	} else if (adminsInfo.idUser !== dataGeo.idEmployee) {
		return NextResponse.json('OK', { status: 403 })
	}

	const serviceGeo = new ServiceGeoLocation(INN)
	const serviceRuleOrganization = new ServiceRuleOrganization(INN)
	const serviceRequisites = new ServiceRequisites(INN)

	const saveData = await Promise.all([
		serviceGeo.setDataLocation(dataGeo),
		serviceRuleOrganization.updateParamsOrganization(data.dataOrganization as TDataOrganization),
		serviceRequisites.updateRequisites(data.dataRequisites),
	])

	const error = saveData.find((req) => isError(req))

	return NextResponse.json(error || 'OK', { status: 200 })
}
