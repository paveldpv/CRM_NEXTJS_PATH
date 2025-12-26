'use client'
import { cn } from '@/shared/lib/cn'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import { TFieldset } from '../model/Types'

export default function Fieldset({ children, legend, ...props }: TFieldset) {
	const { configMain } = useConfigApp((state) => state.dataConfigApp)
	return (
		<fieldset
			style={{ borderColor: configMain?.color.borderColor, background: configMain?.color.bgColor }}
			{...props}
			className={cn(
				'h-full border-2 border-menu_color rounded-xl border-solid  w-full p-4',
				props.className
			)}
		>
			{legend && (
				<legend
					style={{
						background: configMain?.color.bgColor,
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
