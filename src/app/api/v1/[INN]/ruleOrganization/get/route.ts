import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceRuleOrganization } from '../../../../../../../Server/Service/serviceRuleOrganization/serviceRuleOrganization'
import { RuleOrganizationDTO } from '../../../../../../../Server/Service/serviceRuleOrganization/ruleOrganizzation..dto'

export async function GET(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	
	const serviceRule = new ServiceRuleOrganization(INN)
	
	const result = await serviceRule.getParamsOrganizationWithoutRequisites()

	if (isError(result)) {
		return NextResponse.json({ error: result.message }, { status:  500 })
	}
	const resultDTO = RuleOrganizationDTO.createDataOrganizationDTO(result)
	return NextResponse.json(resultDTO, { status: 200 })
}
