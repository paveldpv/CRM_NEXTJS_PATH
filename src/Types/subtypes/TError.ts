import { typicalError } from '../enums'

export type TError = {
   message:string,
   error:boolean
   typeError?:typicalError
}