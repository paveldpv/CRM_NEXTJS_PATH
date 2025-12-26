import { TGeoLocation } from '@/shared/model/types'
import { TFormRegistrate } from '@/shared/model/types/subtypes/Types'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceRegistrated } from '../../../../../../Server/Service/serviceRegistrate/serviceRegistrate'
import { isError } from '@/shared/lib/IsError'
import { typicalError } from '@/shared/model/types/subtypes/enums'

export async function POST(request: NextRequest, { params }: { params: { INN: string } }) {
	const { data, dataGeo } = (await request.json()) as {
		data: TFormRegistrate
		dataGeo: Omit<TGeoLocation, 'date' | 'user' >
	}	

  const serviceRegistrate   = new ServiceRegistrated(data,dataGeo)
  const result = await serviceRegistrate.registratedNewOrganization()
  if(isError(result)){
    return NextResponse.json({ message: typicalError.error_DB }, { status: 404 })
  }else{
    return NextResponse.json({ message: 'OK' }, { status: 200 })

  }

}
