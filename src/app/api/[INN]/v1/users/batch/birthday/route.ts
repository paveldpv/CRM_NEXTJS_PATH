import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceUsers } from '../../../../../../../../Server/Service/serviceUser/serviceUser'
import { ServiceUserDTO } from '../../../../../../../../Server/Service/serviceUser/user.dto'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const serviceUser = new ServiceUsers(INN)
	const result = await serviceUser.getUsersWithBirthdayToday()

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

	const resultDTO = ServiceUserDTO.createListUsersDTO(result)
	return NextResponse.json(resultDTO, { status: 200 })
}
