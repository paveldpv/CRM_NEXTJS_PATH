'use client'
import { useState } from 'react'
import { TPanelRulePrice, TTablePrice } from '../model/Types'
import ModalDescriptionTable from './ModalDescriptionTable'
import PanelRuleOptionsTable from './PanelRuleOptionsTable'
import PanelRuleTable from './PanelRuleTable'

export default function PanelRulePrice({
	nameTable,
	table,
	setDataTable,
	setListDescriptionTable,
	listDescriptionTable,
}: TPanelRulePrice & TTablePrice) {
	const [openModal, setOpenModal] = useState(false)
	return (
		<div className=' overflow-x-hidden  flex  justify-between border-b-black border-b-2 border-b-solid pb-1 '>
			<PanelRuleOptionsTable
				setOpenModal={setOpenModal}
				nameTable={nameTable}
				setDataTable={setDataTable}
				table={table}
			/>
			<PanelRuleTable setDataTable={setDataTable} table={table} />
			<ModalDescriptionTable
				setOpenModal={setOpenModal}
				openModal={openModal}
				setListDescriptionTable={setListDescriptionTable}
				listDescriptionTable={listDescriptionTable}
			/>
		</div>
	)
}
