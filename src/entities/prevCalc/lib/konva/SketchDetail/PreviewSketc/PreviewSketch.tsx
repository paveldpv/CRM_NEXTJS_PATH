import dynamic from 'next/dynamic'
import { Dispatch, memo, SetStateAction, useCallback } from 'react'
import { useDialogWindow } from '../../../../../../shared/ui/dialogWindow/model/storeDialogWindow'

const Scene = dynamic(() => import('../Scene/Scene'), { ssr: false })

import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineCreate } from 'react-icons/md'

import { typeDialog } from '@/shared/model/types/subtypes/enums'
import { TSketchDetail } from '@/shared/model/types/TRequestPrevCalc'
import { Tooltip } from '@mui/material'

type TPreviewSketch = {
	setOpen: Dispatch<SetStateAction<boolean>>
	setIdRedactSketch: Dispatch<SetStateAction<string | undefined>>
	setDataSketchDetail?: Dispatch<SetStateAction<TSketchDetail[] | undefined>>
}

function PreviewSketch({
	lines,
	params,
	setOpen,
	idSketch,
	setIdRedactSketch,
	setDataSketchDetail,
}: TSketchDetail & TPreviewSketch) {
	const [setOpenDialog, setDispatchFn] = useDialogWindow((state) => [state.setOpen, state.setDispatchFn])

	const redactionSketch = useCallback(() => {
		setOpen(true)
		setIdRedactSketch(idSketch)
	}, [])

	const deleteSketch = useCallback(() => {
		console.log(idSketch)

		setOpenDialog(true, { title: 'Удалить?' }, typeDialog.dialog)
		setDispatchFn(() => {
			setDataSketchDetail && setDataSketchDetail((prev) => prev?.filter((sketch) => sketch.idSketch !== idSketch))
		})
	}, [idSketch])

	return (
		<div className=' grid grid-cols-6 w-[30%] h-44 rounded-md  border-menu_color border-2 border-opacity-80  border-dashed p-1 transition delay-500 hover:scale-110 duration-700 cursor-pointer '>
			<div className=' col-span-5 overflow-hidden   '>
				<Scene widthScene={200} heightScene={200} currentLines={lines} previewEntity={true} />
			</div>
			<div className='flex gap-2 border-opacity-40 pl-1 justify-around flex-col border-l-2 border-solid border-menu_color '>
				{setDataSketchDetail && (
					<Tooltip title='удалить эскиз'>
						<button onClick={deleteSketch} type='button' className=' text-xl flex justify-center content-center p-1 '>
							<AiOutlineDelete />
						</button>
					</Tooltip>
				)}
				<Tooltip title='редактировать'>
					<button onClick={redactionSketch} type='button' className=' text-xl flex justify-center content-center p-1 '>
						<MdOutlineCreate />
					</button>
				</Tooltip>
			</div>
		</div>
	)
}
export default memo(PreviewSketch)
