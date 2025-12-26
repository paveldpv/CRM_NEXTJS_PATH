'use client'
import CusButton from '@/shared/ui/CusButton'
import { Tooltip } from '@mui/material'
import { useMemo } from 'react'
import { MdCancel } from 'react-icons/md'
import { TbColumnInsertRight, TbColumnRemove, TbRowInsertBottom, TbRowRemove } from 'react-icons/tb'
import { createVoidRow } from '../model/createNewRow'
import { TTablePrice } from '../model/Types'

export default function PanelRuleTable({ setDataTable, table }: Omit<TTablePrice, 'nameTable'>) {
	const overflowTable = useMemo(() => {
		return table?.length === 11
	}, [table])

	const lengthTable = useMemo(() => {
		return {
			colLength: table.length,
			rowLength: table[0].length,
		}
	}, [table])

	const addRow = () => {
		setDataTable && setDataTable((state) => state.map((el) => [...el, { value: '' }]))
	}

	const addCol = () => {
		if (table.length == 12) {
			return
		}

		setDataTable && setDataTable((state) => [...state, ...createVoidRow(state[0].length)])
	}

	const removeCol = () => {
		setDataTable && setDataTable((state) => state.slice(0, -1))
	}
	const removeRow = () => {
		setDataTable && setDataTable((state) => state.map((el) => el.slice(0, -1)))
	}
	return (
		<div>
			{setDataTable && (
				<div className='flex gap-2'>
					<section hidden={table?.length < 2} className=' flex gap-1'>
						{lengthTable.colLength > 1 && (
							<Tooltip title={'удалить колонку'}>
								<CusButton onClick={removeCol} className=' text-xl hover:bg-text_alert'>
									<TbColumnRemove />
								</CusButton>
							</Tooltip>
						)}
						{lengthTable.rowLength > 0 && (
							<Tooltip title={'удалить ряд'}>
								<CusButton onClick={removeRow} className=' text-xl hover:bg-text_alert'>
									<TbRowRemove />
								</CusButton>
							</Tooltip>
						)}
					</section>

					<section className=' flex gap-1'>
						<Tooltip title={overflowTable ? 'макс.колонок' : 'добавить колонку'}>
							<CusButton onClick={addCol} className=' text-xl' disabled={overflowTable}>
								{overflowTable ? <MdCancel /> : <TbColumnInsertRight />}
							</CusButton>
						</Tooltip>
						<Tooltip title='добавить ряд'>
							<CusButton onClick={addRow} className=' text-xl'>
								<TbRowInsertBottom />
							</CusButton>
						</Tooltip>
					</section>
				</div>
			)}
		</div>
	)
}
