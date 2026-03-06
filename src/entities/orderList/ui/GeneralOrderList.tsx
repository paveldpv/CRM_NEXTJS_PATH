'use client'

import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { TOrderFullInfoDTO } from '@/shared/model/types'
import { viewMode } from '@/shared/model/types/index'
import Loader from '@/shared/ui/loaders/namedLoader/ui/Loader'

import { useEffect, useState } from 'react'


import PaginationPanel from './PaginationPanel'
import RulePanelOrder from './PanelControlOrder'
import ListOrder from './ListOrder'

export default function GeneralOrderList({ data, totalOrders }: { data: TOrderFullInfoDTO[]; totalOrders: number }) {
	const [load, setLoad] = useState(true)
	const [dataOrder, setDataOrder] = useState(data)
	const [viewMode, setViewMode] = useState<viewMode>('list')
	const permission = useInfoUser((state) => state.permission)

	useEffect(() => {
		if (data) {
			setDataOrder(data)
			setLoad(false)
		}
	}, [data])

	return (
		<div className=' grid grid-rows-4'>
			<RulePanelOrder
				totalOrder={totalOrders}
				permission={permission}
				load={load}
				setDataOrder={setDataOrder}
				setLoader={setLoad}
				viewMode={viewMode}
				setViewMode={setViewMode}
			/>

			<div className=' row-span-2'>{load ? <Loader /> : <ListOrder viewMode={viewMode} dataOrder={dataOrder} />}</div>
			<nav>
				<PaginationPanel totalOrder={totalOrders} setLoader={setLoad} setDataOrder={setDataOrder} />
			</nav>
		</div>
	)
}
