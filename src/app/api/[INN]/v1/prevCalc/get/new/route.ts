import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServicePrevCalcDTO } from '../../../../../../../../Server/Service/servicePrevCacl/prevCalc.dto'
import { ServicePrevCalc } from '../../../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'
import { TDBRequestPrevCalc } from '../../../../../../../../Server/Service/servicePrevCacl/model/types/Types'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const servicePrevCalc = new ServicePrevCalc(INN)
	const result = await servicePrevCalc.getNewRequestPrevCalc()

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

	const newRequestDTO = ServicePrevCalcDTO.createListPrevCalcDTO(result as TDBRequestPrevCalc[])
	return NextResponse.json(newRequestDTO, { status: 200 })
	
}
