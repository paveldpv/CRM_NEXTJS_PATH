import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceDaDataOrganization } from '../../../../../../../../Server/Service/serviceDaData/serviceDaDataOrganization'
import { serviceDaDataOrganizationDTO } from '../../../../../../../../Server/Service/serviceDaData/daDataOrganization.dto'
import { TDaDataOrganization } from '../../../../../../../../Server/Service/serviceDaData/model/types/Type'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const service = new ServiceDaDataOrganization(INN)
	const result = await service.getAllDaData()
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
	const daDataListDTO = serviceDaDataOrganizationDTO.createListDaDataOrganization(result as TDaDataOrganization[])
	return NextResponse.json(daDataListDTO, { status: 200 })
}
