'use client'
import { ConfigProvider } from 'antd'
import { useConfigApp } from '@/shared/model/store/storeConfigApp'
import type { ConfigProviderProps } from 'antd'


export default function CusConfigProvider({ 
  children, 
  ...props 
}: ConfigProviderProps) {
  const { configMain } = useConfigApp((state) => state.dataConfigApp)
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: configMain?.color.borderColor || '#F47C28',
          colorPrimaryHover: configMain?.color.bgColor || '#F47C28',
        },
      }}
      {...props}
    >
      {children}
    </ConfigProvider>
  )
}