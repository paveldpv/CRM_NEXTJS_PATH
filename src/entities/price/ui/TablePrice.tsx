'use client'
import { AnimatePresence } from 'framer-motion'
import { TTablePrice } from '../model/Types'
import Cell from './Cell'

export default function TablePrice({ table, setDataTable }: TTablePrice) {
	

	return (
		<table className='flex mt-1  '>
			{table?.map((el, indexCol) => (
				<tbody key={indexCol} className=' '>
					<AnimatePresence>
						{el.map((valueCell, indexRow) => (
							<Cell
								indexCell={{ indexCol, indexRow }}
								key={indexRow}
								value={valueCell.value}
								setDataTable={setDataTable}
							/>
						))}
					</AnimatePresence>
				</tbody>
			))}
		</table>
	)
}
