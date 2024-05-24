import { TDaDataOrganization } from "@/Types/subtypes/TDaDataOrganization"
import { TError } from "@/Types/subtypes/TError"
import { TAnswerUpdateDB } from "@/Types/Types"



const addDaData = async(GeneralINN:string,data:Partial<TDaDataOrganization>):Promise<TAnswerUpdateDB> =>{

}
const getDaData = async(GeneralINN:string,INN:string):Promise<TDaDataOrganization|TError> =>{

}
const deleteDaData = async(GeneralINN:string,INN:string):Promise<TAnswerUpdateDB> =>{

}



const ServiceDaDataOrganization = {
addDaData,getDaData,deleteDaData
}
module.exports = ServiceDaDataOrganization

export default ServiceDaDataOrganization