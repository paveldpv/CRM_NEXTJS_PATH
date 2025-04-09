'use client'

import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { CSSProperties, memo } from 'react'

import { cn } from '../lib/cn'
import { TLink } from '../model/types/Types'
import IconNav from './icons/IconNav'

export type TPropsNavLink = Partial<TLink> & LinkProps & children

type children = {
	children?: React.ReactNode
	className?: string
	styleLinks?:  CSSProperties
}
function NavLink({
	paramsHref = [],
	className,
	description = ``,
	title,
	id,
	children,
	href,
	styleLinks,
	...props
}: TPropsNavLink) {
	const pathName = usePathname()
	const activeLink = pathName!.includes(href)
	const INN = pathName!.split('/').filter((param) => !!param)[0]
	const PHONE = pathName!.split('/').filter((param) => !!param)[1]

	let link = `/${INN}/${PHONE}/main/${href}`
	if (paramsHref.length != 0) {
		link += '/' + paramsHref.join('/')
	}

	return (
		<span
			style={styleLinks}
			className={cn(
				`rounded-md   border-2 border-solid  border-menu_color  p-2  h-10 hover:bg-color_header delay-100  duration-300 ${
					activeLink && 'activeLink'
				}`,
				className
			)}
		>
			<Link className='flex  gap-2 items-center    mx-auto my-0  ' href={link}>
				<span className=' text-2xl '>{id && <IconNav id={id} />}</span>
				<span className=' truncate text-xs   '>{title}</span>
			</Link>
		</span>
	)
}
export default memo(NavLink)
