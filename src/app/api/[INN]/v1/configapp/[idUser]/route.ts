import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ConfigAppDTO } from '../../../../../../../Server/Service/serviceConfigApp/configApp.dto'
import { ServiceConfigApp } from '../../../../../../../Server/Service/serviceConfigApp/serviceConfigApp'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'

export async function GET(request: NextRequest, { params }: { params: { INN: string; idUser: string } }) {
	const { INN, idUser } = params
	const _id = MongoHelpers.stringToObjectId(idUser)
	if (_id == null) {
		return NextResponse.json({ message: 'not valid ID user' }, { status: 400 })
	}
	const serviceConfigApp = new ServiceConfigApp(INN)
	const result = await serviceConfigApp.getPersonalConfig(_id)

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 404 })
	} else {
		const configAppDTO = ConfigAppDTO.createConfigAppDTO(result!)
		return NextResponse.json({ configAppDTO }, { status: 200 })
	}
}
