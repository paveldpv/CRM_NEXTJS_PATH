/**
 * 
 *превращает объект из БД mongo в json
 * @param data 
 * @returns 
 */
export const normalizeMongoData = <T>(data:T)=>JSON.parse(JSON.stringify(data))