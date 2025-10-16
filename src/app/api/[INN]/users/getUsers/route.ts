import { NextRequest, NextResponse } from 'next/server'
import { ServiceUsers } from '../../../../../../Server/Service/serviceUser/serviceUser'


export async function GET(req: NextRequest, { params }: { params: { INN: string } }, res: NextResponse) {
	const isAllEmployee = req.nextUrl.searchParams.get('all')
	
	const serviceUser = new ServiceUsers(params.INN)

	let result =
		isAllEmployee === '0' ? await serviceUser.getAllEmployee() : await serviceUser.getAllEmployeeWithDeleted()
	

	return NextResponse.json(result, { status: 200 })
}
