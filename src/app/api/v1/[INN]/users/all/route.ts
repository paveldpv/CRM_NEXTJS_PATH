import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceUsers } from '../../../../../../../Server/Service/serviceUser/serviceUser'
import { TDBUser } from '../../../../../../../Server/Service/serviceUser/model/types/Types'
import { isError } from '@/shared/lib/IsError'
import { ServiceUserDTO } from '../../../../../../../Server/Service/serviceUser/user.dto'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const body = await request.json()

	const optionQuery = body as TOptionQuery<TDBUser>
	const serviceUser = new ServiceUsers(INN)
	const result = await serviceUser.getAllUsers(optionQuery)
  if(isError(result)){
    return NextResponse.json({ message: result.message }, { status: 500 });
  }
  const resultUserDTO = ServiceUserDTO.createListUsersDTO(result)
  return NextResponse.json(resultUserDTO, { status: 200 });
	

}
