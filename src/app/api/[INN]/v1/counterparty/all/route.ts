import { TOptionQuery } from '@/shared/model/types/subtypes/optionQuery'
import { NextRequest, NextResponse } from 'next/server'
import { TCounterparty } from '../../../../../../../Server/Service/serviceCounterparty/models/types/Types'
import { ServiceCounterparty } from '../../../../../../../Server/Service/serviceCounterparty/serviceCounterparty'
import { isError } from '@/shared/lib/IsError'
import { CounterpartyDTO } from '../../../../../../../Server/Service/serviceCounterparty/counterparty.dto'


export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const { optionQuery } = (await request.json()) as { optionQuery?: TOptionQuery<TCounterparty> }
	const serviceCounterparty = new ServiceCounterparty(INN)
	const result = await serviceCounterparty.getAllCounterparty(optionQuery)
	if (isError(result)) {
		return NextResponse.json({ message: result.message }, { status: 500 })
	}
  const counterpartiesDTO = CounterpartyDTO.createListCounterpartyDTO(result as TCounterparty[])
  return NextResponse.json(counterpartiesDTO, { status: 200 })
	
}
