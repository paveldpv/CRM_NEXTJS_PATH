import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceRequisites } from '../../../../../../../../Server/Service/serviceRequisites/serviceReqisites'
import { RequisitesDTO } from '../../../../../../../../Server/Service/serviceRequisites/requisites.dto'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const serviceRequisites = new ServiceRequisites(INN)
	const result = await serviceRequisites.getAllRequisites()
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
	const resultDTO = RequisitesDTO.createListRequisitesDTO(result)
	return NextResponse.json(resultDTO, { status: 200 })
	
}
