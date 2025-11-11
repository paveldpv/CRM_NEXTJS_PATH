import { TFullDataSettingOrganization } from '@/app/[INN]/[PHONE]/main/setting/settingorganization/page'
import { typicalError } from '@/shared/model/types/subtypes/enums'
import { TGeoLocation } from '@/shared/model/types/subtypes/TGeoLocation'
import { TResponse } from '@/shared/model/types/subtypes/Types'


export const fetchUpdateInfoOrganization = async (
	data: Omit<TFullDataSettingOrganization, 'admins'>,
	INN: string,
	dataGeo: Omit<TGeoLocation, 'date'>
): Promise<TResponse> => {
	try {
		const response = await fetch(`/api/ruleOrganization/${INN}`, {
			method: 'POST',
			body: JSON.stringify({ data, dataGeo }),
		})
		return {
			status: response.status,
			response: await response.json(),
		}
	} catch (error) {
		return {
			status: 400,
			response: {
				error: true,
				message: `error fetch update info organization,error :${error}`,
				typeError: typicalError.error_sever,
			},
		}
	}
}
