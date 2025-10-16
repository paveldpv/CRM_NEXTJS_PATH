import { JWT_TOKEN, REFRESH_TOKEN } from '../../../config/consts'

//#region localStore
const setLocalStore = (value: string, key: string) => {
	if (typeof window === 'undefined') return
	localStorage.setItem(key, value)
}
const getLocalStore = (key: string): null | string => {
	if (typeof window === 'undefined') return null
	return localStorage.getItem(key)
}
//#endregion


//#region JWT token
export const getJWTToken = () => getLocalStore(JWT_TOKEN)
export const setJWTToken = (token: string) => setLocalStore(token, JWT_TOKEN)
//#endregion 

//#region  refresh token
export const getRefreshToken = () => getLocalStore(REFRESH_TOKEN)
export const setRefreshToken = (token: string) => setLocalStore(token, REFRESH_TOKEN)
//#endregion
export const resetTokens =()=>{
	localStorage.removeItem(JWT_TOKEN)
	localStorage.removeItem(REFRESH_TOKEN)
}