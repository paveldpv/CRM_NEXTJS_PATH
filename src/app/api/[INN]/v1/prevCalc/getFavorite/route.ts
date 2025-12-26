import { TRequestPrevCalc } from '@/shared/model/types'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'
import { NextRequest, NextResponse } from 'next/server'

import { isError } from '@/shared/lib/IsError'
import { ServicePrevCalc } from '../../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'
import { TDBRequestPrevCalc } from '../../../../../../../Server/Service/servicePrevCacl/model/types/Types'
import { ServicePrevCalcDTO } from '../../../../../../../Server/Service/servicePrevCacl/prevCalc.dto'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const option = (await request.json()) as TOptionQuery<TRequestPrevCalc> | undefined

	const servicePrevCalc = new ServicePrevCalc(INN)
	const result = await servicePrevCalc.getFavoriteRequest(option)

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
	const favoritesDTO = ServicePrevCalcDTO.createListPrevCalcDTO(result as TDBRequestPrevCalc[])
	return NextResponse.json(favoritesDTO, { status: 200 })
}
