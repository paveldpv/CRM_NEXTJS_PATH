'use client'
import { motion } from 'framer-motion'
import { Anton, Jura } from 'next/font/google'
import { memo } from 'react'
import { useLoader } from '../../model/store/storeLoader'
const jura = Jura({ subsets: ['cyrillic'], weight: ['700'] })
const anton = Anton({ subsets: ['latin'], weight: ['400'] })

function Loader() {
	const [visibleLoader, text]: [boolean, string] = useLoader((state) => [state.visible, state.text])
	// console.log("🚀 ~ Loader ~ visibleLoader:", visibleLoader)
	
	return (
		<motion.span
			animate={{
				scale: [1, 2, 2, 1, 1],
				rotate: [0, 0, 180, 360, 0],
				borderRadius: ['20%', '20%', '50%', '50%', '20%'],
			}}
			initial={{ opacity: 1 }}
			transition={{ repeat: Infinity, duration: 10, delay: 1 }}
			className={`Loader  ${anton.className} cursor-none text-menu_color   pt-4 pb-4  rounded-md  text-5xl  text-center  font-bold mt-5 mb-4   `}
			style={visibleLoader ? { display: 'block' } : { display: 'none' }}
			//hidden ={visibleLoader}
		>
			{text}
		</motion.span>
	)
}
export default memo(Loader)
