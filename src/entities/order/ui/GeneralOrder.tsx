'use client'

import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { TOrderFullInfoDTO } from '@/shared/model/types'
import Loader from '@/shared/ui/loaders/namedLoader/ui/Loader'
import { useMemo, useState } from 'react'
import { ROOT_LINK } from '../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import { viewMode } from '../model/Type'
import RulePanelOrder from './PanelControlOrder'
import ListOrder from './orderView/ListOrder'

export default function GeneralOrder({ data }: { data: TOrderFullInfoDTO[] }) {
	const [load, setLoad] = useState(true)
	const [dataOrder, setDataOrder] = useState(data)
	const [viewMode, setViewMode] = useState<viewMode>('list')
	const dataUser = useInfoUser((state) => state.dataUser)
	const permission = useMemo(() => {
		return dataUser?.linksAllowed === 'ADMIN' || dataUser?.linksAllowed.some((el) => el.href === ROOT_LINK.order)
	}, [])
	return (
		<div className=' grid grid-rows-3'>
			{permission && (
				
					<RulePanelOrder
						load={load}
						setDataOrder={setDataOrder}
						setLoader={setLoad}
						viewMode={viewMode}
						setViewMode={setViewMode}
					/>
				
			)}
			<div className=' row-span-2'>{load ? <Loader /> : <ListOrder />}</div>
		</div>
	)
}
