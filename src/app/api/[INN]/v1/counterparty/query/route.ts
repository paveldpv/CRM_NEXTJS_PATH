import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceCounterparty } from '../../../../../../../Server/Service/serviceCounterparty/serviceCounterparty'
import { TCounterparty } from '@/shared/model/types'
import { CounterpartyDTO } from '../../../../../../../Server/Service/serviceCounterparty/counterparty.dto'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const url = new URL(request.url)
	const query = url.searchParams.get('query') || ''
	const withDeleted = url.searchParams.get('withDeleted') === 'true'
	const serviceCounterparty = new ServiceCounterparty(INN)
	const result = await serviceCounterparty.searchCounterparty(query, withDeleted)
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
	const counterpartiesDTO = CounterpartyDTO.createListCounterpartyDTO(result as TCounterparty[])
	return NextResponse.json(counterpartiesDTO, { status: 200 })
}
