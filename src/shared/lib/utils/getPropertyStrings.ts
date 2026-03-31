import { TPropertyDetailDTO } from '@/shared/model/types'
import { BaseOptionType } from 'antd/es/select'


export  function getPropertyStrings(properties: TPropertyDetailDTO[]): BaseOptionType[] {
  return properties.map((prop) => ({
    value: prop.property,
    label: prop.property,
  }));
}