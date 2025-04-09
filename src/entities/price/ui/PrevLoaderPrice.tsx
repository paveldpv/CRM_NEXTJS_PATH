import style from './stylesPreLoader.module.css'

export default function PrevLoaderPrice() {
	const listPricesPrevLoad = () => {
		return new Array(5).fill(1).map((el) => '_')
	}
	const matrixCellPrevLoad = (): string[][] => {
		return new Array(10).fill(1).map((el) => new Array(5).fill(1).map((el) => ' '))
	}
	const listButtonPrevLoad = () => {
		return new Array(6).fill(1).map((el) => '_')
	}
	return (
		<div>
			<div className=' flex gap-1 pb-2'>
				{listPricesPrevLoad().map((el, index) => (
					<span
						key={index}
						className={`block w-36 border-2 border-menu_color rounded-md h-10 ${style.loader}`}
					></span>
				))}
			</div>
			<hr />
			{listButtonPrevLoad().map((_, index) => (
				<span className={`block w-10 border-2 border-menu_color rounded-md h-10 ${style.loader} ${index==1 && ' w-1'}`}></span>
			))}

			<hr />
			<div className=' flex pt-5'>
				{matrixCellPrevLoad().map((_, index) => (
					<div key={index} className='flex gap-2 flex-wrap items-end '>
						{_.map((el, i) => (
							<span className={`block w-36 border-2 border-menu_color rounded-md h-12 ${style.loader}`}></span>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
