'use client'
import { cn } from '@/shared/lib/cn'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import React, { memo } from 'react'


type TButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const CusButton = React.forwardRef(
	({ children, ...props }: TButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
		const { configMain } = useConfigApp((state) => state.dataConfigApp)
		return (
			<button
			
			className={cn(props.className)}
				ref={ref}
				style={{
					borderColor: configMain?.color.borderColor,
					backgroundColor: configMain?.color.bgColor,
					color: configMain?.color.textColor,
				}}
				{...props}
			>
				{children}
			</button>
		)
	}
)

export default memo(CusButton)
