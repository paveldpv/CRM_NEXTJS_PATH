import { TPrice } from '@/entities/price/model/Types'
import Price from '@/pages/Price/ui/Price'
import { isError } from '@/shared/lib/IsError'
import { typicalError } from '@/shared/model/types/enums'
import { TError } from '@/shared/model/types/subtypes/TError'
import { redirect } from 'next/navigation'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice'

export const getDataPrice = async (INN: string, idTable: string, phone: string): Promise<TPrice | TError> => {
	const servicePrice = new ServicePrice(INN)
	return await servicePrice.getPriceByID(idTable, phone)
}

export default async function page({ params }: { params: { INN: string; phone: string; idTable: string } }) {
	const { INN, phone, idTable } = params
	const getPrice = await getDataPrice(INN, idTable, phone)

	if (isError(getPrice)) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	return <Price price={getPrice.price} readonly={getPrice.readonly} />
}
