import { Service, Inject } from 'typedi';
import { IDatasecurity, IDatasecurityInput } from '../interfaces/MainPage/MainPage_DatasecurityComponent';
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb';

@Service()
export default class MainPage_DatasecurityComponentService {
  constructor(
    @Inject('DatasecurityModel') private DatasecurityModel: Models.DatasecurityModel,
  ) { }
  //for adding data
  public async Add(InputDTO: IDatasecurityInput): Promise<{ Record: IDatasecurity }> {
    const Record = await this.DatasecurityModel.create({ ...InputDTO });
    if (!Record) { throw new Error('Error! Data Cannot be Stored'); }
    else { return { Record }; }

  }

  //to update 
  public async update(InputDTO: IDatasecurityInput): Promise<{ message: string, success: boolean }> {
    try {
      console.log("inputDTO", InputDTO)
      const Record = await this.DatasecurityModel.updateOne({ "_id": "6107e84b3de55d4290ab5168"},{...InputDTO})
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
  public async getall(): Promise<{ Record: Array<IDatasecurity>; }> {
    try {
      const Record = await this.DatasecurityModel.find()
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