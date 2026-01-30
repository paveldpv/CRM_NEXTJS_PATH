import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceUsers } from '../../../../../../../Server/Service/serviceUser/serviceUser'
import { ServiceUserDTO } from '../../../../../../../Server/Service/serviceUser/user.dto'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const url = new URL(request.url)
	const ids = url.searchParams.get('ids')

	if (!ids?.trim()) {
		return NextResponse.json([], { status: 200 }) // Или ошибку 400?
	}
	const list_id = ids.split('!').filter((id) => id.trim())
	const objectIds = MongoHelpers.stringsToObjectIds(list_id)
	if (!objectIds) {
		return NextResponse.json({ message: 'Invalid ID format in list' }, { status: 400 })
	}
	const serviceUser = new ServiceUsers(INN)
	const result = await serviceUser.getUsersByGroupID(objectIds)
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

	const resultDTO = ServiceUserDTO.createListUsersDTO(result)
	return NextResponse.json(resultDTO, { status: 200 })

	
}
