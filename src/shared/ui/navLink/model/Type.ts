import { TLink } from '@/shared/model/types/Types'

import { type LinkProps } from 'next/link'
import { CSSProperties } from 'react'

export type TPropsNavLink = Partial<TLink> & LinkProps & children

type children = {
	children?: React.ReactNode
	className?: string
	styleLinks?: CSSProperties
}
