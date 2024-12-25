'use client'
import { TPrice } from '@/entities/price/model/Types'
import ListDescriptionTable from '@/entities/price/ui/ListDescriptionTable'
import PanelRulePrice from '@/entities/price/ui/PanelRulePrice'
import TablePrice from '@/entities/price/ui/TablePrice'

import { useLoader } from '@/shared/model/store/storeLoader'
import DialogWindow from '@/shared/ui/DialogWindow'
import FieldDialog from '@/shared/ui/FieldDialog'
import Loader from '@/shared/ui/loaders/Loader'
import { useEffect, useState } from 'react'

export default function Price({ price, readonly }: TPrice) {
	const [table, setTable] = useState(price?.data)
	const [visibleLoader, setVisibleLoader] = useLoader((state) => [state.visible, state.setVisibleLoader])
	const [listDescriptionTable, setListDescriptionTable] = useState<string[]>(price.optionDescriptionTable)

	useEffect(() => {
		setVisibleLoader(false)
	}, [price])

	return (
		<fieldset>
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
