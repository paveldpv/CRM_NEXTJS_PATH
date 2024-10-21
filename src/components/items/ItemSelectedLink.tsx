import { TLink } from '@/Types/Types'
import { Tooltip } from '@mui/material'
import { motion } from 'framer-motion'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { useConfigApp } from '../../../store/storeConfigApp'
import { TListLinkedAllowed } from '../additional/SelectedLinkedAllowed'

export type TItemSelectedLink = {
	initialList?: true
	setFiledValue: (name: string, value: any) => void
	setListLinkedAllowed: Dispatch<SetStateAction<TListLinkedAllowed>>
	listLinkedAllowed: TListLinkedAllowed
} & TLink


export default function ItemSelectedLink({
	initialList,
	setFiledValue,
	setListLinkedAllowed,
	listLinkedAllowed,
	...link
}: TItemSelectedLink) {
	const { configMain } = useConfigApp((state) => state.dataConfigApp)

	const addLinkedAllowed = () => {
		if (initialList) {
			setListLinkedAllowed((state) => ({
				selectedLinks: [...state.selectedLinks, link],
				initialLinks: state.initialLinks.filter((stateLink) => stateLink.id != link.id),
			}))
			setFiledValue('linksAllowed', listLinkedAllowed.selectedLinks)
		} else {
			setListLinkedAllowed((state) => ({
				initialLinks: [...state.initialLinks, link],
				selectedLinks: state.selectedLinks.filter((stateLink) => stateLink.id != link.id),
			}))
			setFiledValue('linksAllowed', listLinkedAllowed.selectedLinks)
		}
	}

	const changePermission = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.checked
		setListLinkedAllowed((state) => ({
			selectedLinks: state.selectedLinks.map((stateLink) =>
				stateLink.id === link.id ? { ...stateLink, readonly: value } : stateLink
			),
			initialLinks: state.initialLinks,
		}))
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			transition={{ ease: 'easeOut', duration: 0.5 }}
			style={{
				backgroundColor: configMain?.color.bgColor,
				borderColor: configMain?.color.borderColor,
				color: configMain?.color.textColor,
			}}
			className='flex border-2 border-solid rounded-md w-fit flex-wrap'
		>
			{!initialList && (
				<Tooltip title='разрешить редактирование'>
					<input
						onChange={changePermission}
						type='checkbox'
						className=' ml-1 mr-1 cursor-pointer '
						defaultChecked
					/>
				</Tooltip>
			)}
			<Tooltip title={link.description} className=' cursor-help'>
				<div className=' flex  gap-1'>
					<span className=' p-1  text-xs'>{link.title}</span>
					<button className='   p-1  ' onClick={addLinkedAllowed}>
						{initialList ? <FaPlus /> : <FaMinus />}
					</button>
				</div>
			</Tooltip>
		</motion.div>
	)
}
