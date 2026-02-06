import { TCounterpartyDTO } from '@/shared/model/types'
import { DefaultOptionType } from 'antd/es/select'

export const filterOptionCounterparty = (inputValue: string, option: DefaultOptionType) => {
  // option здесь - это объект из options, не data!
  const cp = option.data as TCounterpartyDTO | undefined
  
  if (!cp) return false
  
  const searchText = inputValue.toLowerCase()
  
  return (
    (cp.INN?.toLowerCase().includes(searchText) || false) ||
    cp.phone.toLowerCase().includes(searchText) ||
    (cp.name?.toLowerCase().includes(searchText) || false) ||
    (cp.email?.toLowerCase().includes(searchText) || false)
  )
}