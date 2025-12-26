import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'

export default function LeftSlider({
	children,
	visibleSlider,
	...props
}: { children: React.ReactNode; visibleSlider: boolean } & HTMLMotionProps<'div'>) {
	return (
		<AnimatePresence>
			{visibleSlider && (
				<motion.div
					{...props}
					initial={{ x: '100vw' }}
					animate={{ x: '45vw' }}
					exit={{ x: '100vw' }}
					transition={{ type: 'tween', duration: 0.5 }}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
//createPortal(LeftSlider,root!)
