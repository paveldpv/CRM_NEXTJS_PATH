/**
 * return abbreviated from full name organization
 * 
 * @param name 
 * 
 * @returns string
 */

export const getAbbreviated =(name:string|undefined):string=>{
   if(!name)return "Не задано";
  
   let nameSplit = name.split(' ').map(str=>str.trim()).filter(str=>!!str).map(str=>str.replace(/[^А-ЯЁA-Z]/, ''))

      
   
   if(nameSplit[0].toLocaleLowerCase()==="ооо"){
     nameSplit.shift()
   }
   
   if(nameSplit.length==0){

      return "Не задано";
   }
   

   if(nameSplit.length==1){
      return nameSplit[0]
   }
   
   const res = nameSplit.reduce((accum,value)=>accum+value[0].toLocaleUpperCase(),``)

   
   
   return res
}



