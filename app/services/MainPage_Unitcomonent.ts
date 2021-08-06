import { Service, Inject } from 'typedi';
import { IUnit, IUnitInput } from '../interfaces/MainPage/MainPage_UnitsComponent';
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb';

@Service()
export default class MainPage_unitcomponentService {
  constructor(
    @Inject('UnitcomponentModel') private Unitcomponent: Models.UnitcomponentModel,
  ) { }
  //for adding data
  public async Add(InputDTO: IUnitInput): Promise<{ Record: IUnit }> {
    const Record = await this.Unitcomponent.create({ ...InputDTO });
    if (!Record) { throw new Error('Error! Data Cannot be Stored'); }
    else { return { Record }; }

  }

  //to update 
  public async update(InputDTO: IUnitInput): Promise<{ message: string, success: boolean }> {
    try {
      console.log("inputDTO", InputDTO)
      const {id} =InputDTO
      const Record = await this.Unitcomponent.updateOne({ "id": id},{...InputDTO})
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
  public async getall(): Promise<{ Record: Array<IUnit>; }> {
    try {
      const Record = await this.Unitcomponent.find()
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