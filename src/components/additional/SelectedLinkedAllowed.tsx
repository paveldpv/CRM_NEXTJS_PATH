import Fieldset from '@/containers/Fieldset'
import { idLink } from '@/Types/enums'
import { TLink } from '@/Types/Types'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { adminLinks } from '../../../config/adminLinks'
import { useConfigApp } from '../../../store/storeConfigApp'
import ItemSelectedLink from '../items/ItemSelectedLink'

export type TListLinkedAllowed = {
	selectedLinks: TLink[] | []
	initialLinks: TLink[] | []
}
type TSelectedLInkedAllowed = {
	currentLinkedAllowed?: TLink[] | []
	setFieldValue: (name: string, value: any) => void
}

export default function SelectedLinkedAllowed({
	currentLinkedAllowed = [],
	setFieldValue,
}: TSelectedLInkedAllowed) {
	const { configMain } = useConfigApp((state) => state.dataConfigApp)	
	const [listLinkedAllowed, setListLinkedAllowed] = useState<TListLinkedAllowed>({
		selectedLinks: [],
		initialLinks: [],
	})

	useEffect(() => {
		if (currentLinkedAllowed.length === 0) {
			setListLinkedAllowed({
				selectedLinks: adminLinks.filter((link) => link.id === idLink.setting),
				initialLinks: adminLinks.filter((link) => link.id !== idLink.setting),
			})
		} else {
			let initialLinks = adminLinks
			currentLinkedAllowed.forEach((curLink) => {
				initialLinks.filter((link) => link.id != curLink.id)
			})
			setListLinkedAllowed({
				selectedLinks: currentLinkedAllowed,
				initialLinks,
			})
		}

		

		
	}, [])

	return (
		<div>
			<Fieldset legend='разрешен доступ к:' className=' p-1 mb-1 border-dashed'>
				<ul className=' flex gap-1 flex-wrap'>
					<AnimatePresence>
						{listLinkedAllowed.selectedLinks.map((link) => (
							<ItemSelectedLink
								listLinkedAllowed={listLinkedAllowed}
								setListLinkedAllowed={setListLinkedAllowed}
								setFiledValue={setFieldValue}
								key={link.id}
								id={link.id}
								href={link.href}
								description={link.description}
								title={link.title}
							/>
						))}
					</AnimatePresence>
				</ul>
			</Fieldset>
			<hr style={{ borderColor: configMain?.color.borderColor }} />
			<Fieldset legend='список доступных прав:' className=' p-1 mt-1 border-dashed'>
				<ul className='  flex gap-1 flex-wrap'>
					<AnimatePresence>
						{listLinkedAllowed.initialLinks.map((link) => (
							<ItemSelectedLink
								listLinkedAllowed={listLinkedAllowed}
								setListLinkedAllowed={setListLinkedAllowed}
								setFiledValue={setFieldValue}
								key={link.id}
								initialList={true}
								id={link.id}
								href={link.href}
								description={link.description}
								title={link.title}
							/>
						))}
					</AnimatePresence>
				</ul>
			</Fieldset>
		</div>
	)
}
