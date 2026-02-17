
import { CollapseProps } from 'antd'
import { ReactNode } from 'react'

export type CusAccordionProps = {
  
  children: ReactNode
  defaultActive?: boolean
   onToggle?: (isActivePanel:string[]) => void // Наше событие
} & Omit<CollapseProps, 'items' | 'defaultActiveKey' | 'activeKey' | 'onChange'>