'use client'
import { keyColorOption } from '@/shared/model/types'
import { Collapse, ColorPicker, Slider, Tooltip } from 'antd'
import { AggregationColor } from 'antd/es/color-picker/color'
import { memo, useCallback } from 'react'
import { FaArrowCircleDown } from 'react-icons/fa'
import { debounce } from 'ts-debounce'
import { TConfigLayout } from '../../../../Server/Service/serviceConfigApp/model/types/Type'
import { TUpdateStateConfigApp, useConfigApp } from '../../../shared/model/store/storeConfigApp'

const { Panel } = Collapse

type TInputSettingLayout = {
	expand: string | boolean
	setExpand: (panel: string | false) => void
	indexPanel: number
} & TConfigLayout

function InputSettingLayout({ color, textSize, font, name, keyConfig, expand, setExpand, indexPanel }: TInputSettingLayout) {
	const [updateColor, updateTextSize] = useConfigApp((state) => [state.updateColor, state.updateTextSize])

	const handlerChangeColor = useCallback(
		(e: AggregationColor, id: string) => {
			const newColor: TUpdateStateConfigApp = {
				value: e.toHex(),
				key: keyConfig,
				name: id,
				keyColorOption: id as keyColorOption,
			}
			updateColor(newColor)
		},
		[keyConfig, updateColor]
	)

	const handlerChangeTextSize = useCallback(
		(value: number) => {
			// TODO: Нужно реализовать логику обновления textSize
			console.log('Text size changed:', value)
			// updateTextSize({ value, key: keyConfig, ... })
		},
		[keyConfig]
	)

	const onChangeAccordion = useCallback(
		(key: string | string[]) => {
			if (key.includes(`panel${indexPanel}`)) {
				setExpand(`panel${indexPanel}`)
			} else {
				setExpand(false)
			}
		},
		[indexPanel, setExpand]
	)

	return (
		<Collapse
			activeKey={expand === `panel${indexPanel}` ? [`panel${indexPanel}`] : []}
			onChange={onChangeAccordion}
			className='border-2 border-solid border-menu_color p-2 rounded-md'
			expandIcon={({ isActive }) => (
				<span
					className='text-2xl text-color_header transform transition-transform duration-300'
					style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}
				>
					<FaArrowCircleDown />
				</span>
			)}
		>
			<Panel key={`panel${indexPanel}`} header={<span className=''>{name}</span>}>
				<ul className='text-sm flex flex-col gap-1'>
					<li>
						<fieldset className='mb-4'>
							<legend className='pl-2 mb-2'>Цвет</legend>
							<div className='flex justify-between gap-5'>
								<Tooltip title='Цвет фона'>
									<div className='flex-1'>
										<label htmlFor={keyColorOption.bgColor} className='block text-xs mb-1'>
											Фон
										</label>
										<ColorPicker
											defaultValue={color?.bgColor}
											onChange={(e) => debounce(() => handlerChangeColor(e, keyColorOption.bgColor), 200)}
											className='w-full h-10 p-1'
										/>
									</div>
								</Tooltip>
								<Tooltip title='Цвет ободки элемента'>
									<div className='flex-1'>
										<label htmlFor={keyColorOption.borderColor} className='block text-xs mb-1'>
											Обводка
										</label>
										<ColorPicker
											defaultValue={color?.borderColor}
											onChange={(e) => debounce(() => handlerChangeColor(e, color?.borderColor), 200)}
											className='w-full h-10 p-1'
										/>
									</div>
								</Tooltip>
								<Tooltip title='Цвет текста'>
									<div className='flex-1'>
										<label htmlFor={keyColorOption.textColor} className='block text-xs mb-1'>
											Текст
										</label>
										<ColorPicker
											defaultValue={color?.textColor}
											onChange={(e) => debounce(() => handlerChangeColor(e, color?.textColor), 200)}
											className='w-full h-10 p-1'
										/>
									</div>
								</Tooltip>
							</div>
						</fieldset>
					</li>
					<li>
						<fieldset>
							<legend className='pl-2 mb-2'>текст</legend>
							<div className='flex gap-5'>
								<div className='flex-1'>
									<Slider
										onChange={debounce(handlerChangeTextSize, 200)}
										defaultValue={1.5}
										step={0.5}
										min={0.5}
										max={4}
										marks={{
											0.5: '0.5',
											1: '1',
											1.5: '1.5',
											2: '2',
											2.5: '2.5',
											3: '3',
											3.5: '3.5',
											4: '4',
										}}
									/>
								</div>
								{/* Поле для шрифта пока закомментировано */}
								{/* <Input placeholder="шрифт" value={font} className='w-32' /> */}
							</div>
						</fieldset>
					</li>
				</ul>
			</Panel>
		</Collapse>
	)
}

export default memo(InputSettingLayout)
