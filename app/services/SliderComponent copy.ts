import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
import { ISliderComponent, ISliderComponentInput } from '../interfaces/MainComponent/SliderComponent';
import jwt from 'jsonwebtoken'

@Service()
export default class slidercomponentService {
  constructor(
    @Inject('slidercomponentModel') private slidercomponent: Models.slidercomponentModel,
  ) { }
  //for adding data
  public async Add(InputDTO: ISliderComponentInput): Promise<{ Record: ISliderComponent }> {
    console.log("servicesbody ==>", InputDTO)
    const Record = await this.slidercomponent.create({ ...InputDTO });
    if (!Record) { throw new Error('Error! Data Cannot be Stored'); }
    else { return { Record }; }

  }

  //to update 
  public async update(InputDTO: ISliderComponentInput): Promise<{ message: string, success: boolean }> {
    try {
      console.log("inputDTO", InputDTO)
      const { pagename } = InputDTO;
      const Record = await this.slidercomponent.updateOne({ "pagename": pagename }, { ...InputDTO })
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
  public async getall(): Promise<{ Record: Array<ISliderComponentInput>; }> {
    try {
      const Record = await this.slidercomponent.find()
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