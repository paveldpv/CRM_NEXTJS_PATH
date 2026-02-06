import { motion } from 'framer-motion'
import { TFormOrder } from '../../model/Type'

export default function FormOrder({ setFocusForm, focusForm }: TFormOrder) {
	return (
		<motion.div
			className='bg-white rounded-xl shadow-lg p-6'
			animate={{
				x: focusForm === 'ORDER' ? 100 : 0,
				scaleX: focusForm === 'ORDER' ? 1.2 : 1,
				scaleY: focusForm === 'DETAIL' ? 0.8 : 1,
			}}
			transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			onClick={() => setFocusForm('ORDER')}
		>
			<motion.div
				animate={{
					rotate: focusForm === 'ORDER' ? 0 : -90, // ← компенсируем поворт контейнера
				}}
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
				className="whitespace-nowrap" // чтобы текст не переносился
			>
				order
			</motion.div>
		</motion.div>
	)
}
