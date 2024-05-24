/**
 * return abbreviated from full name
 * 
 * @param name 
 * 
 * @returns string
 */

export const getAbbreviated =(name:string|undefined):string=>{
   if(!name)return "Не задано";
   let nameSplit = name.split(' ')
   if(nameSplit[0].toLocaleLowerCase()==="ооо"){
      nameSplit.shift()
   }

   if(nameSplit.length=1){
      return nameSplit[0]
   }

   return nameSplit.reduce((accum,value)=>accum+value[0].toLocaleUpperCase())
   

   
}

