import { TError } from "@/Types/subtypes/TError"
import { TRequisites } from "@/Types/subtypes/TRequisites"
import { TAnswerUpdateDB } from "@/Types/Types"

const addRequisites = async (GeneralINN:string,data:Partial<TRequisites>):Promise<TAnswerUpdateDB> =>{

}
const updateRequisites = async(GeneralINN:string,data:Partial<TRequisites>,INN?:string):Promise<TAnswerUpdateDB> =>{

}
const deleteRequisites = async(GeneralINN:string,INN:string):Promise<TAnswerUpdateDB>=>{

}
const getAllRequisites  =async(GeneralINN:string,):Promise<TRequisites[]|TError> =>{

}
const getRequisites =async(GeneralINN:string,params:unknown):Promise<TRequisites|TError> =>{

}



const ServiceRequisites ={
addRequisites,updateRequisites,deleteRequisites,getAllRequisites,getRequisites
}
module.exports =ServiceRequisites

export default ServiceRequisites