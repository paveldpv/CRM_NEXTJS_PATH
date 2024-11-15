import { TError } from '@/shared/model/types/subtypes/TError'
/**
 * check for TERROR
 *
 *
 * @param data
 * @returns boolean
 */

export const isError = <T>(data: any | TError): data is TError => {
	return (data as TError)?.error !== undefined
}
