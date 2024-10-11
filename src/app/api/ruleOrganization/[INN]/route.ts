import { TFullDataSettingOrganization } from '@/app/[INN]/[PHONE]/main/setting/settingorganization/page'
import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { TDataOrganization } from '@/Types/subtypes/TOrganization'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceGeoLocation } from '../../../../../Controllers/Service/serviceGeoLocation'
import { ServiceRequisites } from '../../../../../Controllers/Service/serviceReqisites'
import { ServiceRuleOrganization } from '../../../../../Controllers/Service/serviceRuleOrganization'
import { ServiceUsers } from '../../../../../Controllers/Service/serviceUser'
import { isError } from '../../../../../function/IsError'

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
