import Logger from './Logger'

export default class ContextOrganization extends Logger {
	protected INN: string
	constructor(INN: string | number) {
		super()
		this.INN = INN.toString()
	}
}
