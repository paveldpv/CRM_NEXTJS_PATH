import { NextRequest, NextResponse } from 'next/server'

import { ServiceUsers } from '../../../../../../../Server/Service/serviceUser/serviceUser'
import { ServiceUserDTO } from '../../../../../../../Server/Service/serviceUser/user.dto'
import { isError } from '@/shared/lib/IsError'
import { TDBUser } from '@/shared/model/types'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const { searchParams } = new URL(request.url)
	const phone = searchParams.get('phone') 

  if (!phone?.trim()) {
    return NextResponse.json({ message: 'Missing phone parameter' }, { status: 400 });
  }

	const serviceUser = new ServiceUsers(INN)
	const result = await serviceUser.getUserByPhone(phone.trim())

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

	const resultDTO = ServiceUserDTO.createUserDTO(result as TDBUser)
	return NextResponse.json(resultDTO, { status: 200 })
	
}
