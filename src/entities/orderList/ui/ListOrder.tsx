'use client'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { containerVariants, itemVariants } from '../lib/framer.const'
import { getOrderCardData } from '../lib/getOrderCardData'
import { TListOrder } from '../model/Type'
import { OrderCard } from './orderView/OrderCard'
import OrderList from './orderView/OrderList'

export default function ListOrder({ dataOrder, viewMode }: TListOrder) {
	const pathname = usePathname()

	if (dataOrder.length === 0) {
		return <div className=' row-span-2 text-2xl mb-4'>Нет заказов</div>
	}

	return (
		<CusConfigProvider>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				className={viewMode === 'cards' ? 'grid grid-cols-4 gap-4 p-2' : 'flex flex-col gap-3 p-2'}
			>
				<AnimatePresence mode='popLayout'>
					{dataOrder.map((order) => {
						const orderData = getOrderCardData(order)

						return (
							<motion.div
								key={order._id}
								variants={itemVariants}
								layout
								initial='hidden'
								animate='visible'
								exit='hidden'
								className='h-full'
							>
								{viewMode == 'list' ? (
									<OrderList order={order} pathname={pathname || ''} orderData={orderData} />
								) : (
									<OrderCard order={order} pathname={pathname || ''} orderData={orderData} />
								)}
							</motion.div>
						)
					})}
				</AnimatePresence>
			</motion.div>
		</CusConfigProvider>
	)
}
