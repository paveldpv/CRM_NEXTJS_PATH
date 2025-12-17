
export default function page({params}:{params:{INN:string,PHONE:string,IdEmployee:string}}) {
  const {IdEmployee}=params
  console.log(IdEmployee);
  
  return (
    <div>employee</div>
  )
}