 
export type TApprover<T, K extends keyof T> =  Partial<Omit<T,K>> & Required<Pick<T,K>>
//Partial<Omit<T,K>>
//Required<Pick<T,K>>
/**	
 * type doing selected property option
 */
export type UTPropertyOptional <T,K extends keyof  T > = Omit<T,K> & Partial<Pick<T,K>>