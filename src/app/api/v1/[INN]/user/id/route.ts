import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'

import { ServiceUsers } from '../../../../../../../Server/Service/serviceUser/serviceUser'
import { isError } from '@/shared/lib/IsError'
import { ServiceUserDTO } from '../../../../../../../Server/Service/serviceUser/user.dto'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
  const {INN}=params
	const url = new URL(request.url)
	const _id = url.searchParams.get('id') || undefined

	const userId = MongoHelpers.stringToObjectId(_id)
	if (!userId) {
		return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 })
	}

	const serviceUser = new ServiceUsers(INN)
	const result = await serviceUser.getUserById(userId) 

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

  const resultDTO = ServiceUserDTO.createUserDTO(result);
  return NextResponse.json(resultDTO, { status: 200 });

	
}
