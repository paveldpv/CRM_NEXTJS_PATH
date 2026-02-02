'use client'

import { useInfoUser } from '@/shared/model/store/storeInfoUser'
import { TOrderFullInfoDTO } from '@/shared/model/types'
import { viewMode } from '@/shared/model/types/index'
import Loader from '@/shared/ui/loaders/namedLoader/ui/Loader'
import { Modal } from 'antd'
import { useMemo, useState } from 'react'
import { ROOT_LINK } from '../../../../Server/Service/servicePermissionRedactData/model/types/Types'
import RulePanelOrder from './PanelControlOrder'
import FormOrder from './form/FormOrder'
import ListOrder from './orderView/ListOrder'

export default function GeneralOrder({ data }: { data: TOrderFullInfoDTO[] }) {
	const [load, setLoad] = useState(true)
	const [dataOrder, setDataOrder] = useState(data)
	const [viewMode, setViewMode] = useState<viewMode>('list')
	const dataUser = useInfoUser((state) => state.dataUser)
	const [openForm, setOpenForm] = useState(false)
	const [selectedOrder, seSelectedOrder] = useState<TOrderFullInfoDTO | null>(null)

	const permission = useMemo(() => {
		return !!(
			dataUser?.linksAllowed === 'ADMIN' || dataUser?.linksAllowed.some((el) => el.href === ROOT_LINK.order && !el.readonly)
		)
	}, [])

	return (
		<div className=' grid grid-rows-3'>
			(
			<RulePanelOrder
				permission={permission}
				serOpenForm={setOpenForm}
				load={load}
				setDataOrder={setDataOrder}
				setLoader={setLoad}
				viewMode={viewMode}
				setViewMode={setViewMode}
			/>
			)<div className=' row-span-2'>{load ? <Loader /> : <ListOrder />}</div>
			<nav></nav>
			<Modal
				open={openForm}
				onCancel={() => {
					setOpenForm(false)
					seSelectedOrder(null)
				}}
			>
				<FormOrder permission={permission} setLoader={setLoad} setDataOrder={setDataOrder} serOpenForm={setOpenForm} />
			</Modal>
		</div>
	)
}
