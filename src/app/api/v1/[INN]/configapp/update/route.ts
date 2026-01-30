import { isError } from '@/shared/lib/IsError'
import { TConfigAPP_DTO, TGeoLocation, TNewDataGeoLocationDTO } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { TConfigAPP } from '../../../../../../../Server/Service/serviceConfigApp/model/types/Type'
import { ServiceConfigApp } from '../../../../../../../Server/Service/serviceConfigApp/serviceConfigApp'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'

export async function PUT(request: NextRequest, { params }: { params: { INN: string } }) {
	const INN = params.INN
	const body = await request.json()

	const { data, dataGeo } = body as {
		data: TConfigAPP_DTO
		dataGeo: TNewDataGeoLocationDTO
	}
	const { idUser, _id, ...property } = data
	const { user, ...geoData } = dataGeo
	const ids = MongoHelpers.stringsToObjectIdsTuple(idUser, _id, user)
	if (ids == null) {
		return NextResponse.json({ message: 'not valid ID user' }, { status: 400 })
	}
	const [_idUser, id, userGeoID] = ids

	const dataConfigApp: TConfigAPP = {
		idUser: _idUser,
		_id: id,
		...property,
	}
	const geo: Omit<TGeoLocation, 'date'> = {
		user: userGeoID!,
		...geoData,
	}

	const serviceConfigApp = new ServiceConfigApp(INN)
	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const result = await Promise.all([
		serviceConfigApp.updatePersonalConfig(dataConfigApp),
		serviceGeoLocation.setDataLocation(geo),
	])

	const error = result.filter((el) => isError(el))
	if (error.length != 0) {
		return NextResponse.json({ message: error[0].message }, { status: 404 })
	} else {
		return NextResponse.json({ message: 'OK' }, { status: 200 })
	}
}
