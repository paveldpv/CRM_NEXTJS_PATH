'use client'
// import { TLine } from "@/Types/Types";

import { Dispatch, memo, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

import uniqid from 'uniqid'


import { AiFillCheckCircle } from 'react-icons/ai'
import { FaWindowClose } from 'react-icons/fa'
import { FaQuestion } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'

import { TextField, Tooltip } from '@mui/material'


import InputAdornment from '@mui/material/InputAdornment'
import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('./Scene/Scene'), { ssr: false })


import { TLine, TParamsSegment, TSketchDetail } from '@/shared/model/types/subtypes/TRequestPrevCalc'
import { useHelInformer } from '@/shared/model/store/storeHelpInformer'
import { dataHelperForFormPrevCalc } from '@/entities/prevCalc/model/_DataHelperInfo'
import HelpInformerModalWindow from '@/shared/ui/HelpInformerModalWindow'

export type TNewSketch = {
	setDataSketchDetail: Dispatch<SetStateAction<TSketchDetail[] | undefined>>
	setOpen?: Dispatch<SetStateAction<boolean>>
	setIdRedactSketch?: Dispatch<SetStateAction<string | undefined>>
} & Partial<TSketchDetail>

function NewSketch({ setDataSketchDetail, idSketch, lines, params, setOpen, setIdRedactSketch }: TNewSketch) {
	const setOpenHelpWindow = useHelInformer((state) => state.setOpen)
	const initialParams: TParamsSegment[] = [
		{ mark: 'name', description: 'название детали', value: '', idLine: 'nameDetail' },
		{ mark: 'L', description: 'длинна', value: 1000, idLine: 'lengthDetail' },
	]

	const closeModalWindow = useCallback(() => {
		setIdRedactSketch && setIdRedactSketch(undefined)
		setOpen && setOpen(false)
	}, [setOpen, setIdRedactSketch])

	const [currentLines, setCurrentLines] = useState<TLine[]>(lines || [])
	const [currentParams, setCurrentParams] = useState<TParamsSegment[]>(params || initialParams)
	const [sizeContainerScene, setSizeContainerScene] = useState({ width: 100, height: 100 })
	const refContainerScene = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setSizeContainerScene({
			width: Number(refContainerScene.current?.getBoundingClientRect().width),
			height: Number(refContainerScene.current?.getBoundingClientRect().height),
		})
	}, [])

	const addNewSketch = useCallback(() => {
		if (idSketch) {
			setDataSketchDetail((prev) => {
				let redactSketch = prev?.find((sketchData) => sketchData.idSketch === idSketch)
				redactSketch!.lines = currentLines
				redactSketch!.params = currentParams
				return [...prev!]
			})
			setIdRedactSketch && setIdRedactSketch(undefined)
		} else {
			const newSketch: TSketchDetail = {
				idSketch: uniqid(),
				lines: currentLines,
				params: currentParams,
			}

			setDataSketchDetail((prev) => (prev ? [...prev, newSketch] : [newSketch]))
		}
		setCurrentParams(initialParams)

		closeModalWindow()
	}, [currentParams, idSketch])

	const clearSense = useCallback(() => {
		setCurrentLines([])
		setCurrentParams(initialParams)
	}, [])

	const setValueParams = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number,
		id: string
	) => {
		const value = e.target.value
		const indexRedactParams = currentLines.findIndex((lines) => lines.idLine === id)

		if (id === initialParams[0].idLine) {
			let update = currentParams
			update[indexRedactParams + 1].value = value
			setCurrentParams(update)
			return
		}

		if (id === initialParams[1].idLine) {
			let update = currentParams
			update[indexRedactParams + 2].value = +value
			setCurrentParams(update)
			return
		}

		let update = currentParams
		update[indexRedactParams + 2].value = +value
		setCurrentParams(update)

		let updateSketchValue = currentLines
		updateSketchValue[indexRedactParams].value = +value
		setCurrentLines(updateSketchValue)
	}

	const openHelpWindow = useCallback(() => {
		setOpenHelpWindow(true, dataHelperForFormPrevCalc)
	}, [])

	return (
		<>
			<div className=' w-11/12 h-5/6 opacity-90  relative  bg-list_menu_even text-list_menu_even m-auto  mt-20  rounded-lg'>
				{setOpen && (
					<button className='m-2 text  bg-red-50' onClick={closeModalWindow} type='button'>
						<FaWindowClose />
					</button>
				)}
				<div className=' grid grid-cols-9   h-5/6 '>
					<div ref={refContainerScene} className=' col-span-6 border-r-2 border-solid p-4 overflow-hidden'>
						<Scene
							setCurrentLines={setCurrentLines}
							setCurrentParams={setCurrentParams}
							currentLines={currentLines}
							widthScene={sizeContainerScene.width}
							heightScene={sizeContainerScene.height}
						/>
					</div>
					<div className=' col-span-3 overflow-x-auto'>
						<div className=' flex text-2xl  gap-2  flex-col justify-around'>
							<div className=' border-b-2 border-solid flex  bg-list_menu_even justify-around sticky top-0'>
								<Tooltip title='подтвердить'>
									<button className='m-2 text  bg-red-50' type='button' onClick={addNewSketch}>
										<AiFillCheckCircle />
									</button>
								</Tooltip>
								<Tooltip title='очистить сцену'>
									<button className='m-2 text  bg-red-50' type='button' onClick={clearSense}>
										<MdCancel />
									</button>
								</Tooltip>
								<Tooltip title='как пользоваться'>
									<button className='m-2 text  bg-red-50' type='button' onClick={openHelpWindow}>
										<FaQuestion />
									</button>
								</Tooltip>
							</div>
							<div className=' p-2 flex  flex-col gap-3 '>
								{currentParams.map((param, index) => (
									<TextField
										focused
										variant='outlined'
										className=' text-blue-800'
										autoComplete='off'
										color='success'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<span className=' text-highlight_three border-2 border-solid border-highlight_three rounded-sm p-1'>
														{index === 0 ? 'Имя' : 'ММ'}
													</span>
												</InputAdornment>
											),
											style: { color: '#64A989', fontSize: 18, borderColor: '#64A989' },
										}}
										defaultValue={param.value}
										key={param.idLine}
										label={param.description}
										onChange={(e) => setValueParams(e, index, param.idLine)}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<HelpInformerModalWindow />
		</>
	)
}
export default memo(NewSketch)
