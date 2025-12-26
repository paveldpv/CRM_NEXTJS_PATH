
import { TError } from '@/shared/model/types/subtypes/TError'


import ContextOrganization from '../../classes/contextOrganization'
import { isError } from '@/shared/lib/IsError'
import { ServiceUsers } from '../serviceUser/serviceUser'

import { TDBUser } from '../serviceUser/model/types/Types'
import { ROOT_LINK } from './model/types/Types'
import { Types } from 'mongoose'

export default class ServicePermissionRedactData extends ContextOrganization {
	private rootLink: ROOT_LINK
	private employee: TDBUser | null | TError

	constructor(INN: string, rootLink: ROOT_LINK) {
		super(INN)
		this.employee = null
		this.rootLink = rootLink
	}
	private solutionRedactData(): boolean {
		if (isError(this.employee)) {
			return false
		} else if (this.employee?.linksAllowed === 'ADMIN') {
			return true
		} else if (this.employee?.linksAllowed.find((link) => link.href === this.rootLink && link.readonly == false)) {
			return true
		} else {
			return false
		}
	}
	
	public async PermissionByPhone(phone: string): Promise<boolean> {
		try {
			const serviceUser = new ServiceUsers(this.INN)
			this.employee = await serviceUser.getUserByPhone(phone)
			

			return this.solutionRedactData()
		} catch (error) {
			 this.createError(`error service permission .error : ${error}`,error)			
			return false
		}
	}

	public async Permission(idEmployee:Types.ObjectId): Promise<boolean> {
		try {
			const serviceUser = new ServiceUsers(this.INN)
			this.employee = await serviceUser.getUserById(idEmployee)
			return this.solutionRedactData()
		} catch (error) {
			this.createError(`error service permission .error : ${error}`,error)			
			return false
		}
	}
}
