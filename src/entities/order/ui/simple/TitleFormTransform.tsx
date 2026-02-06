import { motion } from 'framer-motion'
import { TTitleFormTransform } from '../../model/Type'



export default function TitleFormTransform({ title,onClick}: TTitleFormTransform) {
	return (
		<motion.div
		onClick={onClick}
			animate={{
				rotate: -90, 
			}}
			transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			className='whitespace-nowrap' 
		>
			<p className='text-2xl cursor-pointe'>{title}</p>
		</motion.div>
	)
}
