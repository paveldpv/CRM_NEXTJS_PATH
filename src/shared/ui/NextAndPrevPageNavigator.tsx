import { cn } from '@/shared/lib/cn'
import Link from 'next/link'
import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'


type TBaseProp = {
	initialLengthGroup: number
	currentLengthGroup: number
	rangeGroupPage: number
} & React.HTMLAttributes<HTMLDivElement>

type TLinkCurrentPage = TBaseProp & {
	currentLinkPage: string
	schemaLinkPage?: never
}
type TSchemaLinkPage = TBaseProp & {
	schemaLinkPage: (range: number) => string
	currentLinkPage?: never
}

type TNextAndPrevPageNavigation = TLinkCurrentPage | TSchemaLinkPage
/**
 *
 * перелистывает станицу со списком элементов*
 *
 * @argument schemaLinkPage  функция принимающая аргумент  длины списка и возвращает ссылку на станицу
 *
 */

export default function NextAndPrevPageNavigator({
	className,
	initialLengthGroup,
	currentLengthGroup,
	rangeGroupPage,
	schemaLinkPage,
	currentLinkPage,
	...props
}: TNextAndPrevPageNavigation) {
	const nextRange = +rangeGroupPage + initialLengthGroup
	const prevRange = rangeGroupPage - initialLengthGroup

	return (
		<div {...props} className={cn(' flex content-between mt-2 ml-10 mr-10', className)}>
			{initialLengthGroup === rangeGroupPage ? (
				<>
					<div className=' rounded-lg text-4xl border-2 border-solid  border-menu_color opacity-50  p-4 rounded-xs  cursor-not-allowed'>
						<FaAngleLeft />
					</div>
				</>
			) : (
				<>
					<Link
						href={!!schemaLinkPage ? schemaLinkPage(prevRange) : currentLinkPage}
						className=' rounded-lg text-4xl border-2 border-solid  border-menu_color  p-4 rounded-xs  hover:bg-color_header delay-100  duration-300'
					>
						<FaAngleLeft />
					</Link>
				</>
			)}

			{initialLengthGroup > currentLengthGroup ? (
				<div className=' rounded-lg text-4xl border-2 border-solid  border-menu_color opacity-50  p-4 rounded-xs cursor-not-allowed'>
					<FaAngleRight />
				</div>
			) : (
				<Link
					href={!!schemaLinkPage ? schemaLinkPage(nextRange) : currentLinkPage}
					className=' rounded-lg text-4xl border-2 border-solid  border-menu_color  p-4 rounded-xs  hover:bg-color_header delay-100  duration-300'
				>
					<FaAngleRight />
				</Link>
			)}
		</div>
	)
}
