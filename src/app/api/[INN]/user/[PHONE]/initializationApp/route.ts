import { isError } from '@/shared/lib/IsError'
import { NextRequest, NextResponse } from 'next/server'
import { ServiceConfigApp } from '../../../../../../../Server/Service/serviceConfigApp/serviceConfigApp'
import { ServiceSession } from '../../../../../../../Server/Service/serviceSession/serviceSession'
import { ServiceUsers } from '../../../../../../../Server/Service/serviceUser/serviceUser'

export async function GET(req: NextRequest, { params }: { params: { INN: string; PHONE: string } }) {
	const { INN, PHONE } = params
	const serviceUsers = new ServiceUsers(INN)
	const dataUser = await serviceUsers.getUserByPhone(PHONE)
	if (isError(dataUser) || !dataUser) {
		return NextResponse.json(dataUser, { status: 404 })
	}

	const serviceConfigApp = new ServiceConfigApp(INN)
	const dataConfigApp = await serviceConfigApp.getPersonalConfig(dataUser._id)

	if (isError(dataConfigApp) || !dataConfigApp) {
		return NextResponse.json(dataConfigApp, { status: 404 })
	}
	const serviceSession = new ServiceSession(INN)
	await serviceSession.changeActionSessions(dataUser._id)
	const { password, ...user } = dataUser
	return NextResponse.json({ user, dataConfigApp }, { status: 200 })
}
