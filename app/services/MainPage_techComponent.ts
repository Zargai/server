import { Service, Inject } from 'typedi';
import { Itec, ItecInput } from '../interfaces/MainPage/MainPage_techComponent';
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb';

@Service()
export default class MainPage_techcomponentService {
  constructor(
    @Inject('TechcomponentModel') private Techcomponent: Models.teccomponentModel,
  ) { }
  //for adding data
  public async Add(InputDTO: ItecInput): Promise<{ Record: Itec }> {
    const Record = await this.Techcomponent.create({ ...InputDTO });
    if (!Record) { throw new Error('Error! Data Cannot be Stored'); }
    else { return { Record }; }

  }

  //to update 
  public async update(InputDTO: ItecInput): Promise<{ message: string, success: boolean }> {
    try {
      console.log("inputDTO", InputDTO)
      const {id} =InputDTO
      const Record = await this.Techcomponent.updateOne({ "id": id},{...InputDTO})
      if (Record.nModified <= 0) {
        return { message: "No Modification", success: false }
      }
      return { message: "Data Updated", success: true };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //getalldata
  public async getall(): Promise<{ Record: Array<Itec>; }> {
    try {
      const Record = await this.Techcomponent.find()
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