import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
import { IsafepotblogcomponentInput,Isafepotblogcomponent } from '../interfaces/ISafepotblogcomponent';
import jwt from 'jsonwebtoken'

@Service()
export default class safepotblogcomponentService {
  constructor(
    @Inject('safepotblogcomponentModel') private safepotblogcomponent : Models.safepotblogcomponentModel,
  ) {}
 //for adding data
 public async Add(InputDTO: IsafepotblogcomponentInput): Promise<{ Record: Isafepotblogcomponent}> {
  
    const Record = await this.safepotblogcomponent.create({ ...InputDTO });
       if (!Record) {  throw new Error('Error! Data Cannot be Stored');  }
       else{   return { Record }; }
       
}

  //to update 
  public async update(InputDTO: IsafepotblogcomponentInput): Promise<{ message:string, success: boolean }> {
    try {   
      console.log("inputDTO",InputDTO)
      const Record = await this.safepotblogcomponent.updateOne({"id":"safepotblogcomponent"},{...InputDTO})
      if(Record.nModified <= 0){
        return {message:"No Modification", success:false}
      }
      return {message:"Data Updated", success:true};
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //getalldata
  public async getall(): Promise<{Record: Array<IsafepotblogcomponentInput>; }> {
    try {
      const Record = await this.safepotblogcomponent.find()
      if (!Record) {
        throw new Error('No data found!');
      }
      console.log('****data Found***');
      console.log(Record);
      return { Record };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}