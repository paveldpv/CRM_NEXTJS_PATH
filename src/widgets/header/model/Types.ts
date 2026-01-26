import { TDBRequestPrevCalcDTO, TUserDTOByBirthday } from '@/shared/model/types'

export type TNotificationsList = {
	birthdayUser?: TUserDTOByBirthday[] | []
	newPrevCalc?: TDBRequestPrevCalcDTO[] | []
}
