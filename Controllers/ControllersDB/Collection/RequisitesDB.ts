import modelRequisites from "../SCHEMAS/SchemaOrganization/RequisitesSchema";
import { TRequisites } from "@/Types/subtypes/TRequisites";
import { connect } from "mongoose";
import ContextOrganization from "../../classes/contextOrganization";



export default class ControllerDBRequisites extends ContextOrganization{
  constructor(INN:string){
    super(INN)

  }
  
  public async addNewRequisites  ( dataNewRequisites: Partial<TRequisites>) {
    await connect(`${process.env.DB_URL}${this.INN}`);    
    const newRequisites = new modelRequisites(dataNewRequisites);
    await newRequisites.save();
  };

  public async updateRequisites  ( data: Partial<TRequisites>)  {
    await connect(`${process.env.DB_URL}${this.INN}`);
     await modelRequisites.updateOne({ INN: data.INN }, data);
  };


  public async deleteRequisites  ( INN: string)  {
    await connect(`${process.env.DB_URL}${this.INN}`);
     await modelRequisites.updateOne(
      { INN: INN },
      {
        $set: {
          safeDeleted: true,
        },
      }
    );
  };

  public async getRequisiteByParams  ( params: TRequisites): Promise<TRequisites|null>  {
    await connect(`${process.env.DB_URL}${this.INN}`);
    return await modelRequisites.findOne(params,{safeDeleted:false});
  };

  public async getAllRequisites  (): Promise<TRequisites[]> {
    await connect(`${process.env.DB_URL}${this.INN}`);
    return await modelRequisites.find({});
  };

  public async getRequisitesCurrentOrganization  (): Promise<TRequisites>  {  
    await connect(`${process.env.DB_URL}${this.INN}`);  

    return (await modelRequisites.findOne({"INN.value":this.INN},{_id:0,__v:0}).exec()) as TRequisites;
  };

}

