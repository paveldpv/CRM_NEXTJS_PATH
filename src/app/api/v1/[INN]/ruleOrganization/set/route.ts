import { TDataOrganizationDTO, TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceRuleOrganization } from '../../../../../../../Server/Service/serviceRuleOrganization/serviceRuleOrganization'
import { isError } from '@/shared/lib/IsError'

export async function PUT(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()
	const { data, dataGeo } = body as { data: TDataOrganizationDTO; dataGeo: TNewDataGeoLocationDTO }

	const ids = MongoHelpers.stringsToObjectIdsTuple(data._id, dataGeo.user,data.requisites)
	if (!ids) {
		return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 })
	}
	const [dataId, userID,dataRequisitesID] = ids
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.details)
	const permissionUser = await servicePermission.Permission(userID)
	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied for propertyDetail' }, { status: 403 })
	}
	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const serviceRuleOrganization = new ServiceRuleOrganization(INN)
	const result =await Promise.all([
		serviceGeoLocation.setDataLocation({...dataGeo,user:userID}),
		serviceRuleOrganization.updateParamsOrganization({...data,_id:dataId,requisites:dataRequisitesID})
	])
	const errors = result.filter(el=>isError(el))
	if(errors.length!=0){
		return NextResponse.json(
        { message: errors[0].message || 'Failed to add property detail' },
        { status: 500 }
      );
	}
	

	return NextResponse.json('OK', { status: 200 })
}
