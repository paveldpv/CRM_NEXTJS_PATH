'use client'
import { Modal } from '@mui/material'
import { FaWindowClose } from 'react-icons/fa'
import { useHelInformer } from '../model/store/storeHelpInformer'

import type { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'подсказка',
}

export default function HelpInformerModalWindow() {
	const [open, setOpen, title, listMessage] = useHelInformer((state) => [
		state.open,
		state.setOpen,
		state.title,
		state.listMessage,
	])

	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<div className='   rounded-md  bg-text_list_menu p-4  text-list_menu_even text-center w-1/2 flex flex-col gap-3 absolute  top-1/3  left-1/4'>
				<button className=' w-8 ' onClick={() => setOpen(false)}>
					<FaWindowClose />
				</button>
				{title && (
					<h1 className=' cursor-help text-menu_color text-md  bg-color_header p-2 rounded-md '>{title}</h1>
				)}
				{listMessage && listMessage.length != 0 && (
					<ul className=' flex flex-col gap-2'>
						{listMessage.map((text, index) => (
							<li
								key={index}
								className={` p-2 ${
									index % 2 == 0 ? 'bg-list_menu_even' : ' bg-list_menu'
								} cursor-pointer text-text_navigate_menu transition delay-200 hover:scale-105 hover:text-black duration-1000  rounded-md  text-xs`}
							>
								{text}
							</li>
						))}
					</ul>
				)}
			</div>
		</Modal>
	)
}
