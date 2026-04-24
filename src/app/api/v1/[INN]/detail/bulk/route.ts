import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { MongoHelpers } from '../../../../../../../Server/classes/until/MongoHelpers'
import { ServiceDetails } from '../../../../../../../Server/Service/serviceDetails/serviceDetails'
import { ServiceDetailDTO } from '../../../../../../../Server/Service/serviceDetails/detail.dto'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const url = new URL(request.url)
	const idsParam = url.searchParams.get('ids')

	if (!idsParam) {
		return NextResponse.json({ error: 'ids query parameter is required' }, { status: 400 })
	}

	const ids = idsParam.split('!').filter(Boolean)
	if (ids.length === 0) {
		return NextResponse.json({ error: 'ids parameter must contain at least one ID' }, { status: 400 })
	}

	const objectIds = MongoHelpers.stringsToObjectIds(ids)
	if (!objectIds) {
		return NextResponse.json({ error: 'One or more IDs have invalid format' }, { status: 400 })
	}

	const service = new ServiceDetails(INN)
	const result = await service.getBaseDetailsByIDs(objectIds)
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}

	const detailsDTO = ServiceDetailDTO.createListDetailDTO(result)
	return NextResponse.json(detailsDTO, { status: 200 })
}