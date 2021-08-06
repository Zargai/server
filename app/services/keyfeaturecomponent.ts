import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
import { IKeyFeature,IKeyFeatureInput} from '../interfaces/MainComponent/KeyFeatureComponent';
import jwt from 'jsonwebtoken'

@Service()
export default class keyfeaturecomponentService {
  constructor(
    @Inject('keyfeaturecomponentModel') private keyfeaturecomponent: Models.keyfeaturecomponentModel,
  ) { }
  //for adding data
  public async Add(InputDTO: IKeyFeatureInput): Promise<{ Record: IKeyFeature }> {
    console.log("servicesbody ==>", InputDTO)
    const Record = await this.keyfeaturecomponent.create({ ...InputDTO });
    if (!Record) { throw new Error('Error! Data Cannot be Stored'); }
    else { return { Record }; }

  }

  //to update 
  public async update(InputDTO: IKeyFeatureInput): Promise<{ message: string, success: boolean }> {
    try {
      console.log("inputDTO", InputDTO)
      const { id} = InputDTO;
      const Record = await this.keyfeaturecomponent.updateOne({ "id": id }, { ...InputDTO })
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
  public async getall(): Promise<{ Record: Array<IKeyFeatureInput>; }> {
    try {
      const Record = await this.keyfeaturecomponent.find()
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