 
export type TApprover<T, K extends keyof T> =  Partial<Omit<T,K>> & Required<Pick<T,K>>
//Partial<Omit<T,K>>
//Required<Pick<T,K>>

