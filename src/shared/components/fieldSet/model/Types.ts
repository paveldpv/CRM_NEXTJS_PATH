import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export type TFieldset = {
	children: ReactNode
	legend?: string | ReactNode
} & DetailedHTMLProps<HTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>