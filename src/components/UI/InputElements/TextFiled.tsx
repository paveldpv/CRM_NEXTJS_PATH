// import { TFieldData } from "@/Types/Types";
// import { FormikErrors } from "formik/dist/types";
// import { ChangeEvent } from "react";

// type TTextField = {
//   values: any;
//   handleChange?: (e: ChangeEvent<any>) => void;
//   initialErrors?: FormikErrors<unknown>;
//   errors?: FormikErrors<unknown>;
//   className?: string;
// } & TFieldData;

//  function TextFiled({
//   name,
//   title,
//   type,
//   handleChange,
//   errors,
//   placeholder,
//   className,
//   values,
//   initialErrors,
// }: TTextField) {
 
  
//   return (
//     <>
//       <label htmlFor={name} className={`labelForInput  ${className}`}>
//         {placeholder}
//       </label>
//       <input
//         name={name}
//         id={title}
//         type={type}
//         placeholder={placeholder}
//         // @ts-ignore: error message
//         className={`customInput ${!!errors[title] && " bg-red-700"}`}
//         onChange={handleChange && handleChange}
//         // @ts-ignore: error message
//         value={`${[values[name]]}`}
//       />
//       {/* @ts-ignore: error message */}
//       {!!errors[title] && (
//         // @ts-ignore: error message
//         <span className=" pt-1 select-none text-center  text-red-900  font-bold ">
//           {/* @ts-ignore: error message */}
//           {errors[title]}
//         </span>
//       )}
//     </>
//   );
// }
