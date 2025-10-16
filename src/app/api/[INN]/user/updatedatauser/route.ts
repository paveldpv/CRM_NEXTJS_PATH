import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'

import { NextRequest, NextResponse } from 'next/server'

import { isError } from '../../../../../shared/lib/IsError'
import { TWithoutPassUser } from '@/shared/model/types/Types'
import { ServiceUsers } from '../../../../../../Server/Service/serviceUser/serviceUser'
import { ServiceGeoLocation } from '../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'

export async function POST(req: NextRequest, { params }: { params: { INN: string } }, res: NextResponse) {
	const INN = params.INN
	const requestData = await req.json()
	const { dataUser, dataGeo } = requestData as { dataUser: TWithoutPassUser; dataGeo: Omit<TGeoLocation, 'date'> }
	const serviceUser = new ServiceUsers(INN)

	const serviceGeo = new ServiceGeoLocation(INN)

	const saveData = await Promise.all([serviceUser.updateDataUser(dataUser), serviceGeo.setDataLocation(dataGeo)])
	const error = saveData.find((req) => isError(req))

	return NextResponse.json(error || 'OK', { status: 200 })
}
