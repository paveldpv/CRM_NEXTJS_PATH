import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceOrder } from '../../../../../../../Server/Service/serviceOrder/serviceOrder'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	const url = new URL(request.url)
	const { searchParams } = new URL(request.url)
	const completed = searchParams.get('completed') === 'true'
	const deleted = searchParams.get('deleted') === 'true'

	const serviceOrder = new ServiceOrder(INN)
	const amountOrder = serviceOrder.getAmountOrder({ completed, deleted })
	if (isError(amountOrder)) {
		return NextResponse.json('error get amount order', { status: 500 })
	}
	return NextResponse.json(amountOrder, { status: 200 })
}
