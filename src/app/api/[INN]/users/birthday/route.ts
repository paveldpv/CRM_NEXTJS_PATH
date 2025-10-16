import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { INN: string } }) {
	const { searchParams } = new URL(req.url)
	const idUser = searchParams.get('from')

}
