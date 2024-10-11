'use client'
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../function/helpers/cn'
import { useConfigApp } from '../../store/storeConfigApp'
type TFieldset = {
	children: ReactNode
	legend?: string | ReactNode
} & DetailedHTMLProps<HTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>

export default function Fieldset({ children, legend, ...props }: TFieldset) {
	const { configMain } = useConfigApp((state) => state.dataConfigApp)
	return (
		<fieldset
			style={{ borderColor: configMain?.color.borderColor }}
			{...props}
			className={cn(
				'h-full border-2 border-menu_color rounded-xl border-solid  w-full p-4',
				props.className
			)}
		>
			{legend && (
				<legend
					style={{
						borderColor: configMain?.color.borderColor,
						color: configMain?.color.textColor,
					}}
					className={cn('border-2 text-xs border-menu_color rounded-xl border-solid p-2  ml-6')}
				>
					{legend}
				</legend>
			)}
			{children}
		</fieldset>
	)
}
