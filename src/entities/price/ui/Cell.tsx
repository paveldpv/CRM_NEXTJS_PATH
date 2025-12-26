'use client'
import { TextField } from '@mui/material'
import { motion } from 'framer-motion'
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'
import { TCellTablePrice } from '../model/Types'
import { formattingPriceCell } from '../model/formattingPrice'

function Cell({ value, setDataTable, indexCell }: TCellTablePrice) {
	const [valueCell, setValueCell] = useState(value)
	const [freezeCell, setFreezeCell] = useState(true)

	useEffect(() => {
		setValueCell(formattingPriceCell(value))
	}, [value])

	const onChangeCell = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.target.value
		setValueCell(value)
	}, [])

	const diFreezeCell = useCallback(() => {
		setFreezeCell(false)
	}, [])

	const handlerBlur = () => {
		if (valueCell.toString().length === 0) return
		setValueCell((value) => formattingPriceCell(value))
		setFreezeCell(true)

		setDataTable &&
			setDataTable((state) => {
				const currentCell = state[indexCell.indexCol][indexCell.indexRow]
				state[indexCell.indexCol][indexCell.indexRow] = {
					...currentCell,
					value: valueCell,
				}
				return state
			})
	}

	return (
		<tr className={`flex flex-wrap  mt-2  ${indexCell.indexRow === 0 && ` border-b-2 border-red-800 border-solid`}`}>
			<motion.td
				className='w-full'
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ x: -1000, y: 1000 }}
			>
				<TextField
					inputProps={{ style: { fontSize: valueCell.toString().length > 20 ? 12 : 16 } }}
					disabled={freezeCell}
					onBlur={handlerBlur}
					onMouseEnter={setDataTable && diFreezeCell}
					size='small'
					fullWidth
					minRows={2}
					maxRows={2}
					multiline={true}
					label={Number(valueCell) ? 'стоимость' : ''}
					onChange={onChangeCell}
					value={valueCell}
				/>
			</motion.td>
		</tr>
	)
}

export default memo(Cell)
