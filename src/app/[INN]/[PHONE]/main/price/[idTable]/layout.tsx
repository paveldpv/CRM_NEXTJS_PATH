import ListPrices from '@/entities/price/ui/ListPrices'
import PrevLoaderPrice from '@/entities/price/ui/PrevLoaderPrice'
import { isError } from '@/shared/lib/IsError'
import { TLink } from '@/shared/model/types/Types'
import { ROOT_LINK, typicalError } from '@/shared/model/types/enums'
import { TError } from '@/shared/model/types/subtypes/TError'
import ListLinks from '@/shared/ui/listLInks/ui/ListLinks'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import ServicePermissionRedactData from '../../../../../../../Server/Service/ServicePermissionRedactData'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice'

export const dynamic = 'force-dynamic'
export const revalidate = 100

export const getListPrice = async (
	INN: string,
	phone: string
): Promise<TError | { bunchOfLinks: TLink[]; readonly: boolean }> => {
	const servicePrice = new ServicePrice(INN)
	const data = await servicePrice.getListInfoPrices()
	if (isError(data)) {
		return data
	}
	const permissionRedactPrice = new ServicePermissionRedactData(INN, ROOT_LINK.price)
	const solution = await permissionRedactPrice.PermissionByPhone(phone)
	return {
		bunchOfLinks: data,
		readonly: !solution,
	}
}

export default async function layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { INN: string; PHONE: string }
}) {
	const { INN, PHONE } = params

	const listLinks = await getListPrice(INN, PHONE)
	console.log('🚀 ~ listLinks :', listLinks)

	if (isError(listLinks)) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}

	return (
		<>
			<Suspense fallback={<PrevLoaderPrice />}>
				{listLinks.readonly ? (
					<ListLinks listLinks={listLinks.bunchOfLinks} className=' flex-row flex gap-1 mb-1' />
				) : (
					<ListPrices listLinks={listLinks.bunchOfLinks} INN={INN} />
				)}

				{children}
			</Suspense>
		</>
	)
}
