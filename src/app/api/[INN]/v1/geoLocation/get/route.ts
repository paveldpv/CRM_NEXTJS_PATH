import { TGeoLocation } from '@/shared/model/types'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'
import { NextRequest, NextResponse } from 'next/server'

import { isError } from '@/shared/lib/IsError'
import { ServiceGeoLocation } from '../../../../../../../Server/Service/serviceGeoLocation/serviceGeoLocation'
import { ServiceGeoLocationFullInfoDTO } from '../../../../../../../Server/Service/serviceGeoLocation/geoLocation.dto'
import { TGeolLocationFullInfo } from '../../../../../../../Server/Service/serviceGeoLocation/model/types/type'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params

	const option = (await request.json()) as TOptionQuery<TGeoLocation> | undefined

	const serviceGeoLocation = new ServiceGeoLocation(INN)
	const result = await serviceGeoLocation.getDataLocation(option)

	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
	const geoDataDTO = ServiceGeoLocationFullInfoDTO.createListGeoLocationFullInfoDTO(result as TGeolLocationFullInfo[])
	return NextResponse.json(geoDataDTO, { status: 200 })

	
}
