'use client'
import { fetchGetDataPrice } from '@/entities/price/api/getDataPrice'
import { TPrice } from '@/entities/price/model/Types'
import ListDescriptionTable from '@/entities/price/ui/ListDescriptionTable'
import PanelRulePrice from '@/entities/price/ui/PanelRulePrice'
import TablePrice from '@/entities/price/ui/TablePrice'

import { useLoader } from '@/shared/model/store/storeLoader'
import DialogWindow from '@/shared/ui/DialogWindow'
import FieldDialog from '@/shared/ui/FieldDialog'
import Loader from '@/shared/ui/loaders/Loader'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Price({ price, readonly }: TPrice) {
	const [table, setTable] = useState(price?.data)
	const [visibleLoader, setVisibleLoader] = useLoader((state) => [state.visible, state.setVisibleLoader])
	const [listDescriptionTable, setListDescriptionTable] = useState<string[]>(price.optionDescriptionTable)
	const { INN, idTable, PHONE } = useParams() as { INN: string; idTable: string; PHONE: string }

	useEffect(() => {
		if (readonly) return

		setVisibleLoader(true)
		fetchGetDataPrice(INN, idTable, PHONE).then((res) => {
			
			if (!res) return
			
			setTable(res.price.data)
			setVisibleLoader(false)
		})
	}, [])

	return (
		<fieldset className='mt-1'>
			{visibleLoader ? (
				<div>
					<Loader />
				</div>
			) : (
				<>
					{!readonly && (
						<PanelRulePrice
							nameTable={price.nameTable}
							table={table}
							setDataTable={setTable}
							setListDescriptionTable={setListDescriptionTable}
							listDescriptionTable={listDescriptionTable}
						/>
					)}
					{listDescriptionTable.length != 0 && readonly && (
						<ListDescriptionTable listDescriptionTable={listDescriptionTable} />
					)}
					<TablePrice nameTable={price.nameTable} table={table} setDataTable={setTable} />
				</>
			)}
			<FieldDialog />
			<DialogWindow />
		</fieldset>
	)
}
