import { TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ROOT_LINK } from '../../../../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import ServicePermissionRedactData from '../../../../../../../Server/Service/servicePermissionRedactData/ServicePermissionRedactData'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServicePropertyDetail } from '../../../../../../../Server/Service/servicePropertyDetail/servicePropertyDetail'
import { isError } from '@/shared/lib/IsError'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()
	const { property, dataGeo } = body as {
		property: string
		dataGeo: TNewDataGeoLocationDTO
	}
	const userId = MongoHelpers.stringToObjectId(dataGeo.user)
	if (!userId) {
		return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 })
	}
	const servicePermission = new ServicePermissionRedactData(INN, ROOT_LINK.details)
	const permissionUser = await servicePermission.Permission(userId)

	if (!permissionUser) {
		return NextResponse.json({ message: 'Permission denied for propertyDetail' }, { status: 403 })
	}

	

	const servicePropertyDetail = new ServicePropertyDetail(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)

	const result = await Promise.all([
		servicePropertyDetail.addPropertyDetail(property),
		serviceGeoLocation.setDataLocation({...dataGeo,user:userId}),
	])
  const errors = result.filter(el => isError(el));
    if (errors.length > 0) {
      return NextResponse.json(
        { message: errors[0].message || 'Failed to add property detail' },
        { status: 500 }
      );
    }
     return NextResponse.json(
      { 
        message: 'OK', 
        data: {
          propertyDetail: result[0],
          geoLocation: result[1]
        }
      },
      { status: 201 }
    );


}
