import { NextRequest, NextResponse } from 'next/server'
import { ServicePropertyDetail } from '../../../../../../../Server/Service/servicePropertyDetail/servicePropertyDetail'
import { isError } from '@/shared/lib/IsError'
import { PropertyDetailDTO } from '../../../../../../../Server/Service/servicePropertyDetail/propertyDetail.dot'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {

	const {INN}=params
	const { searchParams } = new URL(request.url)
	const searchQuery = searchParams.get('search')

	if (!searchQuery?.trim()) {
		return NextResponse.json([], { status: 200 })
	}

	const servicePropertyDetail = new ServicePropertyDetail(INN)
	const result = await servicePropertyDetail.searchProperty(searchQuery.trim())

  if (isError(result)) {
    return NextResponse.json({ message: result.message }, { status: 500 });
  }
  const resultDTO = PropertyDetailDTO.createListPropertyDetailDTO(result)
  return NextResponse.json(resultDTO, { status: 200 });
	
}
