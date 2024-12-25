import { cn } from '../lib/cn'
import { TPropsNavLink } from './NavLink'

import NavLink from './NavLink'

type TListLink = {
	listLinks: TPropsNavLink[]
	className?: string
}

export default function ListLinks({ listLinks = [], className }: TListLink) {
	return (
		<div className={cn('flex flex-col',className)}>
			{listLinks.map((link, index) => (
				<NavLink
					paramsHref={link?.paramsHref}
					id={link.id}
					title={link.title}
					href={link.href}
					key={index}
					description={link.description}
					
				/>
			))}
		</div>
	)
}
