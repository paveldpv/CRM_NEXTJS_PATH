import { NextRequest, NextResponse } from 'next/server'

import { serviceDaDataOrganizationDTO } from '../../../../../../../../Server/Service/serviceDaData/daDataOrganization.dto'
import { TDaDataOrganization } from '../../../../../../../../Server/Service/serviceDaData/model/types/Type'
import { ServiceDaDataOrganization } from '../../../../../../../../Server/Service/serviceDaData/serviceDaDataOrganization'
import { isError } from '@/shared/lib/IsError'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const body = await request.json()
	const { queryINN } = body as { queryINN: string }

	if (!queryINN) {
		return NextResponse.json({ error: 'queryINN is required' }, { status: 400 })
	}

	const service = new ServiceDaDataOrganization(INN)
	const result = await service.getDaDataByINN(queryINN)

	if (isError(result)) {
		return NextResponse.json(
			{ message: result.message },
			{ status: 404 } 
		)
	}

	const daDataDTO = serviceDaDataOrganizationDTO.createDaDataOrganizationDTO(result as TDaDataOrganization)
	return NextResponse.json(daDataDTO, { status: 200 })

	

}
