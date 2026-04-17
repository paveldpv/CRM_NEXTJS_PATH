import { DTO } from '../../classes/DTO'
import { ServiceOrderFullInfoDTO } from '../serviceOrder/order.dto'
import { 
    TDetail, 
    TDetailDTO, 
    TFullInfoTDetail, 
    TFullInfoTDetailDTO,
    TBaseDetailDTO,
    TAssemblyDetailDTO,
    TFullInfoBaseDetailDTO,
    TFullInfoAssemblyDetailDTO
} from './model/types/Types'

export class ServiceDetailDTO extends DTO {
    static createDetailDTO(data: TDetail): TDetailDTO {
        if (data.entitiesType === 'ASSEMBLY') {
            const { components, ...rest } = data
            return {
                ...rest,
                _id: this.objectIDToString(data._id),
                order: this.objectIDToString(data.order),
                components: components?.map(id => this.objectIDToString(id)) || []
            } as TAssemblyDetailDTO
        } else {
            const { components, ...rest } = data
            return {
                ...rest,
                _id: this.objectIDToString(data._id),
                order: this.objectIDToString(data.order),
                components: undefined
            } as TBaseDetailDTO
        }
    }

    static createListDetailDTO(data: TDetail[]): TDetailDTO[] {
        return data.map((el) => this.createDetailDTO(el))
    }
}

export class ServiceFullInfoDetailDTO extends DTO {
    static createFullInfoDetailDTO(data: TFullInfoTDetail): TFullInfoTDetailDTO {
        if (data.entitiesType === 'ASSEMBLY') {
            const { components, ...rest } = data
            return {
                ...rest,
                _id: this.objectIDToString(data._id),
                order: ServiceOrderFullInfoDTO.createOrderFullInfoDTO(data.order),
                components: components?.map(comp => this.createFullInfoDetailDTO(comp)) || []
            } as TFullInfoAssemblyDetailDTO
        } else {
            const { components, ...rest } = data
            return {
                ...rest,
                _id: this.objectIDToString(data._id),
                order: ServiceOrderFullInfoDTO.createOrderFullInfoDTO(data.order),
                components: undefined
            } as TFullInfoBaseDetailDTO
        }
    }

    static createListFullInfoOrderDTO(data: TFullInfoTDetail[]): TFullInfoTDetailDTO[] {
        return data.map((el) => this.createFullInfoDetailDTO(el))
    }
}