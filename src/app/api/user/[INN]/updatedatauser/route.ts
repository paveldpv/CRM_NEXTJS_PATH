import { TGeoLocation } from '@/Types/subtypes/TGeoLocation'
import { TWithoutPassUser } from '@/Types/Types'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceUsers } from '../../../../../../Controllers/Service/serviceUser'
import { ServiceGeoLocation } from '../../../../../../Controllers/Service/serviceGeoLocation'
import { isError } from '../../../../../../function/IsError'

export async function POST(req: NextRequest, { params }: { params: { INN: string } }, res: NextResponse) {
  
  
  
  
 const INN                   = params.INN
 const requestData           = await req.json()
 const { dataUser, dataGeo } = requestData as { dataUser: TWithoutPassUser; dataGeo: Omit<TGeoLocation, 'date'> }
 const serviceUser           = new ServiceUsers(INN)
 
 const serviceGeo            = new ServiceGeoLocation(INN)
 
 const saveData = await Promise.all([
  serviceUser.updateDataUser(dataUser),
  serviceGeo.setDataLocation(dataGeo)
 ])
  const error = saveData.find(req=>isError(req))

	

	return NextResponse.json(error || 'OK', { status: 200 })
}
