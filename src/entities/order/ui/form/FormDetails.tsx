import { motion } from 'framer-motion'
import { TFromDetail } from '../../model/Type'

type Props = {}

export default function FormDetails({ setFocusForm, focusForm }: TFromDetail) {
	return (
		<motion.div
			className='col-span-12 row-span-3 bg-white rounded-xl shadow-lg p-6'
			animate={{
				y: focusForm === 'DETAIL' ? -100 : 0,
				scaleY: focusForm === 'DETAIL' ? 1.2 : 0.8,
			}}
			 transition={{ type: "spring", stiffness: 200, damping: 25 }}
			onClick={() => setFocusForm('DETAIL')}
		>
			<div>detail</div>
		</motion.div>
	)
}
