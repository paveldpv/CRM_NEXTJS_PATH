import { NextRequest, NextResponse } from 'next/server'

import { TDBRequestPrevCalc } from '../../../../../../../../Server/Service/servicePrevCacl/model/types/Types'
import { ServicePrevCalcDTO } from '../../../../../../../../Server/Service/servicePrevCacl/prevCalc.dto'
import { ServicePrevCalc } from '../../../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'
import { isError } from '@/shared/lib/IsError'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const service = new ServicePrevCalc(INN)
	const result = await service.getDeletedRequest()

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

	
	const deletedDTO = ServicePrevCalcDTO.createListPrevCalcDTO(result as TDBRequestPrevCalc[])
	return NextResponse.json(deletedDTO, { status: 200 })
	
}
