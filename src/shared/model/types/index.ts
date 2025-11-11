//TODO:  все общие типы из сервисов и DTO типы
import { TConfigAPP_DTO } from '../../../../Server/Service/serviceConfigApp/model/types/Type'
import {
	TCounterparty,
	TCounterpartyDTO,
	TNewDataCounterparty,
} from '../../../../Server/Service/serviceCounterparty/models/types/Types'
import { TDaDataOrganizationDTO } from '../../../../Server/Service/serviceDaData/model/types/Type'
import { TDetailDTO, TFullInfoTDetailDTO, TNewDetailDTO } from '../../../../Server/Service/serviceDetails/model/types/Types'
import {
	TGeolLocationDTO,
	TGeolLocationFullInfoDTO,
	TGeoLocation,
	TNewDataGeoLocationDTO,
} from '../../../../Server/Service/serviceGeoLocation/model/types/type'
import { TGlobalListCompany } from '../../../../Server/Service/serviceGlobalListCompany/model/types/Type'
import { TNewUser, TUserDTOByBirthday, TUserDTOWithoutPas } from '../../../../Server/Service/serviceUser/model/types/Types'



export type {
	TConfigAPP_DTO,
	TCounterparty,
	TCounterpartyDTO,
	TDaDataOrganizationDTO,
	TDetailDTO,
	TFullInfoTDetailDTO,
	TGeolLocationDTO,
	TGeolLocationFullInfoDTO,
	TGeoLocation,
	TGlobalListCompany,
	TNewDataCounterparty,
	TNewDataGeoLocationDTO,
	TNewDetailDTO,
	TNewUser,
	TUserDTOByBirthday,
	TUserDTOWithoutPas,
}
