import type { Metadata } from 'next'
import { Suspense } from 'react'

import ListLinks from '@/shared/ui/listLInks/ui/ListLinks'
import { dataLinkSetting } from './dataLinksSetting'

export const metadata: Metadata = {
	title: 'Настройки',
	description: 'Настройки приложения',
}

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Suspense
				fallback={
					<div className=' flex justify-center items-center'>
						<span className='Loader'>Загружаем</span>
					</div>
				}
			>
				<div className='flex gap-1 pb-2 border-b-2 border-menu_color border-solid'>
					<ListLinks listLinks={dataLinkSetting} className=' flex-row gap-1' />
				</div>
				{children}
			</Suspense>
		</>
	)
}
