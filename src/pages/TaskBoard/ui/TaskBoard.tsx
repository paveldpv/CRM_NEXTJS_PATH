'use client'
import { TTasksBoard } from '@/entities/taskBoard/model/Types'
import ListOrders from '@/entities/taskBoard/ui/ListOrders'
import ListProcessTasks from '@/entities/taskBoard/ui/ListProcessTasks'
import FormaAddOrder from '@/entities/taskBoard/ui/form/FormaAddOrder'
import CusButton from '@/shared/ui/CusButton'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import mockOrders from '@/entities/taskBoard/test/mock/mock_order'

export default function TaskBoard({ readonly, listOrder=mockOrders, listProcessTask=[] }: TTasksBoard) {
	const [openFormAddNewOrder, setAddFormNewOrder] = useState(false)
	const [currentListProcessTask, setCurrentListProcessTask] = useState(listProcessTask)
	const [currentListOrder, setCurrentListOrder] = useState(listOrder)

	return (
		<div className=' flex gap-2'>
			<motion.div
				className=' flex border-2 border-green-500 border-solid'
				whileHover={{ width: '90%' }}
				transition={{ delay: 0.5, duration: 0.5 }}
				initial={{width:'50%'}}
			>
				<ListProcessTasks
					setDataTask={setCurrentListProcessTask}
					dataTask={currentListProcessTask}
					dataOrder={currentListOrder}
					setDataOrder={setCurrentListOrder}
				/>
			</motion.div>
			{!readonly && (
				<motion.div
					className='  border-2 border-red-500 border-solid'
					whileHover={{ width: '90%' }}
					transition={{ delay: 0.5, duration: 0.5 }}
					initial={{width:'50%'}}
				>
					<CusButton className='flex' onClick={() => setAddFormNewOrder(true)}>
						<FaPlus />
						<p>Новый заказ</p>
					</CusButton>
					<hr />
					<ListOrders
						setDataTask={setCurrentListProcessTask}
						dataTask={currentListProcessTask}
						dataOrder={currentListOrder}
						setDataOrder={setCurrentListOrder}
					/>
				</motion.div>
			)}
			<FormaAddOrder open={openFormAddNewOrder} setOpen={setAddFormNewOrder} />
		</div>
	)
}
