/**
 * объединяет два массива
 *
 * по ЗНАЧЕНИЮ ключа keyFirsObj(из значений обьекта первого массива)  
 * 
 * с значениями второго переданного массива где нужное значение ищется по значению keySecondObj
 *
 *
 * ! переписать описание
 *
 * @param firstArr
 * @param secondArr
 * @param keyFirsObj
 * @param keySecondObj
 * @returns
 */
export const unionFunc = <T, K>(
  firstArr: T[],
  secondArr: K[],
  keyFirsObj: keyof T,
  keySecondObj: keyof K
): (T & K)[] => {
  let objSecondArr: any = {};

  secondArr.forEach((element) => {
    objSecondArr[element[keySecondObj]] = element;
  });

  let res: (T & K)[] = [];

  firstArr.forEach((element) => {
    res.push({ ...element, ...objSecondArr[element[keyFirsObj]] });
  });

  return res;
};
