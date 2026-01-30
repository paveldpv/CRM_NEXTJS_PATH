'use client'
import { fetchGetDataPrice } from '@/entities/price/api/getDataPrice'

import ListDescriptionTable from '@/entities/price/ui/ListDescriptionTable'
import PanelRulePrice from '@/entities/price/ui/PanelRulePrice'
import TablePrice from '@/entities/price/ui/TablePrice'
import DialogWindow from '@/shared/ui/dialogWindow/ui/DialogWindow'

import FieldDialog from '@/shared/ui/FieldDialog/ui/FieldDialog'
import { useLoader } from '@/shared/ui/loaders/namedLoader/model/storeLoader'
import Loader from '@/shared/ui/loaders/namedLoader/ui/Loader'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TPrice } from '../../../../Server/Service/servicePrice/model/types/Types'

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
