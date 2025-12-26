import { TPrice } from '@/entities/price/model/Types'
import Price from '@/pages/Price/ui/Price'
import { isError } from '@/shared/lib/IsError'
import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TError } from '@/shared/model/types/subtypes/TError'
import { redirect } from 'next/navigation'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice'

export const dynamic = 'force-dynamic'
export const revalidate = 100

export const getDataPrice = async (INN: string, idTable: string, phone: string): Promise<TPrice | TError> => {
	const servicePrice = new ServicePrice(INN)
	return await servicePrice.getPriceByID(idTable, phone)
}

export default async function page({ params }: { params: { INN: string; PHONE: string; idTable: string } }) {
	const { INN, PHONE, idTable } = params
	const getPrice = await getDataPrice(INN, idTable, PHONE)
	console.log('🚀 ~ page ~ getPrice:', getPrice)

	if (isError(getPrice)) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	return <Price price={getPrice.price} readonly={getPrice.readonly} />
}
