'use client'
import { TLink } from '@/Types/Types'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'
import { useConfigApp } from '../../../store/storeConfigApp'
import IconNav from '../additional/IconNav'

export type TPropsNavLink = Partial<TLink> & LinkProps & children

type children = {
	children?: React.ReactNode
	className?: string
}
function NavLink({
	paramsHref = [],
	className,
	description = ``,
	title = ``,
	id,
	children,
	href,
	...props
}: TPropsNavLink) {
	const { configNavMenu } = useConfigApp((state) => state.dataConfigApp)
	const pathName = usePathname()
	const activeLink = pathName.includes(href)
	const INN = pathName.split('/').filter((param) => !!param)[0]
	const PHONE = pathName.split('/').filter((param) => !!param)[1]

	let link = `/${INN}/${PHONE}/main/${href}`
	if (paramsHref.length != 0) {
		link += '/' + paramsHref.join('/')
	}

	return (
		<span
			className={`rounded-md   border-2 border-solid  border-menu_color  p-2 rounded-md h-10 hover:bg-color_header delay-100  duration-300 ${
				activeLink && 'activeLink'
			}`}
		>
			<Link className='flex  gap-2 items-center    mx-auto my-0  ' href={link}>
				<span className=' text-2xl '>{id && <IconNav id={id} />}</span>
				<span className=' truncate text-xs  '>{title}</span>
			</Link>
		</span>
	)
}
export default memo(NavLink)
