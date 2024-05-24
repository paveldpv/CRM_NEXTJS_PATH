type TGenericObject =  {
  [key: string]: any;
}
/**
 * 
 * check has an object key == indicator
 * 
 * @param obj 
 * @param indicator 
 * @returns 
 */
export const hasNotIndicatedProperty = (obj: TGenericObject = {}, indicator = "не указано"): Boolean => {
  for (const key in obj) {
    const element = obj[key];
    if (element === indicator) return true;
  }
  return false;
};
