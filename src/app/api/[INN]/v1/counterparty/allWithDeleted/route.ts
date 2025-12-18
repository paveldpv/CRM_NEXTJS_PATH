import { TCounterparty } from '@/shared/model/types'
import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'
import { NextRequest, NextResponse } from 'next/server'
import { isError } from 'util'
import { CounterpartyDTO } from '../../../../../../../Server/Service/serviceCounterparty/counterparty.dto'
import { ServiceCounterparty } from '../../../../../../../Server/Service/serviceCounterparty/serviceCounterparty'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const { optionQuery } = (await request.json()) as { optionQuery?: TOptionQuery<TCounterparty> }
	const serviceCounterparty = new ServiceCounterparty(INN)
	const result = await serviceCounterparty.getAllCounterpartyWithDeleted(optionQuery)
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
	const counterpartiesDTO = CounterpartyDTO.createListCounterpartyDTO(result as TCounterparty[])
	return NextResponse.json(counterpartiesDTO, { status: 200 })
	
}
