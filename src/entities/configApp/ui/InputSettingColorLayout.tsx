'use client'
import { keyColorOption } from '@/shared/model/types/subtypes/enums'
import { TConfigLayout, TUpdateStateConfigApp } from '@/shared/model/types/subtypes/TAppearanceConfigApp'
import { Accordion, Tooltip } from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import React, { memo, useCallback } from 'react'
import { FaArrowCircleDown } from 'react-icons/fa'
import { debounce } from 'ts-debounce'
import { useConfigApp } from '../../../shared/model/store/storeConfigApp'

type TInputSettingLayout = {
	expand: string | boolean
	setExpand: (panel: string | false) => void
	indexPanel: number
} & TConfigLayout

function InputSettingLayout({ color, textSize, font, name, keyConfig, expand, setExpand, indexPanel }: TInputSettingLayout) {
	const [updateColor, updateTextSize] = useConfigApp((state) => [state.updateColor, state.updateTextSize])

	const handlerChangeColor = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newColor: TUpdateStateConfigApp = {
			value: e.target.value,
			key: keyConfig,
			name: e.target.id,
			keyColorOption: e.target.id as keyColorOption,
		}
		updateColor(newColor)
	}, [])
	const handlerChangeTextSize = useCallback((event: Event, value: number | number[], activeThumb: number) => {}, [])

	const onChangeAccordion = useCallback(() => {
		if (expand === `panel${indexPanel}`) {
			setExpand(false)
		} else {
			setExpand(`panel${indexPanel}`)
		}
	}, [expand])

	return (
		<Accordion
			expanded={expand === `panel${indexPanel}`}
			onChange={onChangeAccordion}
			className='  border-2 border-solid border-menu_color p-2  rounded-md  '
		>
			<AccordionSummary
				expandIcon={
					<span className=' text-2xl text-color_header'>
						<FaArrowCircleDown />
					</span>
				}
			>
				<span className=''>{name}</span>
			</AccordionSummary>
			<ul className='text-sm flex flex-col gap-1'>
				<li>
					<fieldset>
						<legend className='pl-2'>Цвет</legend>
						<div className='flex justify-between gap-5'>
							<Tooltip title='Цвет фона'>
								<TextField
									type='color'
									id={keyColorOption.bgColor}
									fullWidth
									defaultValue={color?.bgColor}
									onChange={debounce(handlerChangeColor, 200)}
								/>
							</Tooltip>
							<Tooltip title='Цвет ободки элемента'>
								<TextField
									type='color'
									fullWidth
									id={keyColorOption.borderColor}
									defaultValue={color?.borderColor}
									onChange={debounce(handlerChangeColor, 200)}
								/>
							</Tooltip>
							<Tooltip title='Цвет текста'>
								<TextField
									type='color'
									id={keyColorOption.textColor}
									fullWidth
									defaultValue={color?.textColor}
									onChange={debounce(handlerChangeColor, 200)}
								/>
							</Tooltip>
						</div>
					</fieldset>
				</li>
				<li>
					<fieldset>
						<legend className='pl-2'>текст</legend>
						<div className=' flex  gap-5'>
							<Slider
								onChange={debounce(handlerChangeTextSize, 200)}
								//value={+textSize}
								defaultValue={1.5}
								step={0.5}
								marks
								min={0.5}
								max={4}
							/>
							{/* <TextField placeholder="шрифт" value={font} /> */}
						</div>
					</fieldset>
				</li>
			</ul>
		</Accordion>
	)
}
export default memo(InputSettingLayout)
