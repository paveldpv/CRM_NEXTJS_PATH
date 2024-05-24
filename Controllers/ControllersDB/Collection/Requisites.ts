import { TAnswerUpdateDB } from "@/Types/Types"
import modelRequisites from "../SCHEMAS/SchemaOrganization/RequisitesSchema"
import { TRequisites } from '@/Types/subtypes/TRequisites'
import { TError } from "@/Types/subtypes/TError"



export const saveRequisites =async(data:Partial<TRequisites>):Promise<TAnswerUpdateDB>=>{

}
export const updateRequisites = async():Promise<TAnswerUpdateDB>=>{

}
export const deleteRequisites  =async():Promise<TAnswerUpdateDB>=>{

}
export const getRequisitesByParams = async():Promise<TRequisites|TError>=>{

}
export const getAllRequisites = async():Promise<TRequisites[]|TError> =>{

}









const ControllerRequisitesDB = {
    saveRequisites,updateRequisites,deleteRequisites,getRequisitesByParams,getAllRequisites
}
module.exports =ControllerRequisitesDB
export default ControllerRequisitesDB