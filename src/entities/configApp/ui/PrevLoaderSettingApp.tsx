import style from './stylesPreLoader.module.css'

export default function PrevLoaderSettingApp() {
	return (
		<div className=' style_border  w-full p-2 mt-2  flex flex-col gap-5  '>
			<div className=' grid  grid-cols-5 gap-4'>
				<section className=' col-span-3 style_border h-96'>
					<ul className='  flex flex-col gap-3 p-4 pt-16'>
						<li className={`h-20 style_border ${style.loader}`}></li>
						<li className={`h-20 style_border ${style.loader}`}></li>
						<li className={`h-20 style_border ${style.loader}`}></li>
					</ul>
				</section>
				<section className=' col-span-2 style_border'>
					<ul className='flex flex-wrap  gap-6 p-4 pt-16'>
						<li className={`w-40 h-24 style_border ${style.loader} `}></li>
						<li className={`w-40 h-24 style_border ${style.loader} `}></li>
						<li className={`w-40 h-24 style_border ${style.loader} `}></li>
						<li className={`w-40 h-24 style_border ${style.loader} `}></li>
					</ul>
				</section>
			</div>
		</div>
	)
}
