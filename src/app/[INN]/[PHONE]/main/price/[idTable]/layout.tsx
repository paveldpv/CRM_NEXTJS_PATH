import PanelAddPrice from '@/entities/price/ui/PanelAddPrice'
import { isError } from '@/shared/lib/IsError'
import { typicalError } from '@/shared/model/types/enums'
import { TError } from '@/shared/model/types/subtypes/TError'
import { TLink } from '@/shared/model/types/Types'
import ListLinks from '@/shared/ui/ListLinks'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { ServicePrice } from '../../../../../../../Server/Service/servicePrice'

export const getListPrice = async (INN: string): Promise<TError | TLink[]> => {
	const servicePrice = new ServicePrice(INN)
	return await servicePrice.getListInfoPrices()
}

export default async function layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { INN: string }
}) {
	const { INN } = params
	const listLinks = await getListPrice(INN)

	if (isError(listLinks)) {
		redirect(`/ERROR/${typicalError.error_DB}`)
	}
	return (
		<>
			<Suspense
				fallback={
					<div className=' flex justify-center items-center'>
						<span className='Loader'>Загружаем</span>
					</div>
				}
			>
				<nav className='flex items-center gap-2 border-b-2 mb-2 pb-2'>
					<ListLinks listLinks={listLinks} className=' flex-row flex gap-1' />
					<PanelAddPrice listLinks={listLinks} INN={INN} />
				</nav>
				{children}
			</Suspense>
		</>
	)
}
