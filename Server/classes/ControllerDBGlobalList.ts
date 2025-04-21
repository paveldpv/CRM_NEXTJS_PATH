import { connect } from 'mongoose'
import {globalCompany} from '../Service/serviceGlobalListCompany/model/types/Type'


export class ControllerDBGlobalList{
	protected async connectDBGlobaList(){
		await connect(`${process.env.DB_URL}${globalCompany}`)
	}
}