import { isError } from '@/shared/lib/IsError'
import { TRequestPrevCalc } from '@/shared/model/types'
import { NextRequest, NextResponse } from 'next/server'
import * as yup from 'yup'
import { ServicePrevCalc } from '../../../../../../../Server/Service/servicePrevCacl/servicePrevCalc'
import { requestPrevCalcSchema } from '../../../../../../../Server/Service/servicePrevCacl/validate/validate'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { INN } = params
	try {
		const rawData = (await request.json()) as TRequestPrevCalc
		const validatedData = (await requestPrevCalcSchema.validate(rawData, {
			abortEarly: false, // Return all errors at once
		})) as TRequestPrevCalc
		const servicePrevCalc = new ServicePrevCalc(INN)
		const result = await servicePrevCalc.saveRequest(validatedData)
		if (isError(result)) {
      return NextResponse.json(
        { message: result.message },
        { status: 500 }
      )
		}

		return NextResponse.json('OK', { status: 201 })
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			return NextResponse.json(
				{
					error: 'Validation failed',
					details: error.errors,
				},
				{ status: 400 }
			)
		}
	}
	
}
