import { TDataOrganizationDTO, TConfigAPP_DTO, TUserDTOWithoutPas } from '@/shared/model/types'

export type TWrapper = {
	INN: string
	idUSer: string
	infoOrganization: TDataOrganizationDTO
	dataConfigApp: TConfigAPP_DTO
	dataUser: TUserDTOWithoutPas
	JWT?: string
	refreshToken?: string
}
