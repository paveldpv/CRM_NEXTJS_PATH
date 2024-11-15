
import { cn } from '@/shared/lib/cn'
import styles from './stylesPreLoader.module.css'

export default function PrevLoaderHistoryEntryLocation() {
	const layoutGroupPreLoaderInfoEmployee = new Array(5).fill('.')

	return (
		<div className=' cursor-wait'>
			<ul className='grid grid-cols-4 gap-2 mt-2'>
				<li className={cn('itemList', styles.loader)}>Сотрудник</li>
				<li className={cn('itemList', styles.loader)}>Цель</li>
				<li className={cn('itemList', styles.loader)}>Точка Входа</li>
				<li className={cn('itemList', styles.loader)}>время</li>
			</ul>
			<div className='grid grid-cols-4 gap-2 mt-2  h-16'>
				<div className={cn('itemList', styles.loader)}></div>
				<div className={cn('itemList', styles.loader)}></div>
			</div>
			<ul>
				{layoutGroupPreLoaderInfoEmployee.map((voidElement, index) => {
					return (
						<ul key={index} className=' grid  grid-cols-4 gap-2 h-20 mt-2'>
							<li className={cn('itemList', styles.loader, 'col-span-1')}></li>
							<li className={cn('itemList', styles.loader, 'col-span-1')}></li>
							<li className={cn('itemList', styles.loader, 'col-span-1')}></li>
							<li className={cn('itemList', styles.loader, 'col-span-1')}></li>
						</ul>
					)
				})}
			</ul>
		</div>
	)
}
