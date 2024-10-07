import style from "./../styleLoader.module.css";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../../../function/helpers/cn'

export type THorizonLoader = {
	visible?: boolean
	children?: ReactNode
} & DetailedHTMLProps<HTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>

export default function HorizonLoader({ children, visible = false, ...props }: THorizonLoader) {
	return <div hidden={visible} className={cn('w-full flex  items-center justify-center',style.Mini_Loader, props.className)}>{children}</div>
}
