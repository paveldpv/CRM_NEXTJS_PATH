import { connect } from 'mongoose'
import ContextOrganization from './contextOrganization'

export default class ControllerDB extends ContextOrganization {
	protected async contentDB() {
		await connect(`${process.env.DB_URL}${this.INN}`)
	}
}
