'use client'
import React, { memo } from 'react'
import { useConfigApp } from '../../../../store/storeConfigApp'

type TButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const CusButton = React.forwardRef(
	({ children, ...props }: TButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
		const { configMain } = useConfigApp((state) => state.dataConfigApp)
		return (
			<button
				ref={ref}
				style={{ borderColor: configMain?.color.borderColor, backgroundColor: configMain?.color.bgColor,color:configMain?.color.textColor }}
				{...props}
			>
				{children}
			</button>
		)
	}
)

export default memo(CusButton)
