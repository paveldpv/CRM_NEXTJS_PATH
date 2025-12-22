import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceFullInfoDetailDTO } from '../../../../../../../Server/Service/serviceDetails/detail.dto'
import { ServiceDetails } from '../../../../../../../Server/Service/serviceDetails/serviceDetails'
import { TFullInfoTDetail } from '../../../../../../../Server/Service/serviceDetails/model/types/Types'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const url = new URL(request.url)
	const req = url.searchParams.get('req')

	const service = new ServiceDetails(INN)
	const result = await service.searchDetail(req || '')
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
	const detailsDTO = ServiceFullInfoDetailDTO.createListFullInfoOrderDTO(result as TFullInfoTDetail[])
	return NextResponse.json(detailsDTO, { status: 200 })
	
}
