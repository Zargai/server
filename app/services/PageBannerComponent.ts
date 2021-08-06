import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
import { IPageBanner,IPageBannerInput } from '../interfaces/MainComponent/PageBanner';
import jwt from 'jsonwebtoken'

@Service()
export default class pagebannercomponentService {
  constructor(
    @Inject('pagebannercomponentModel') private pagebannercomponent: Models.pagebannercomponentModel,
  ) { }
  //for adding data
  public async Add(InputDTO: IPageBannerInput): Promise<{ Record: IPageBanner }> {
    console.log("servicesbody ==>", InputDTO)
    const Record = await this.pagebannercomponent.create({ ...InputDTO });
    if (!Record) { throw new Error('Error! Data Cannot be Stored'); }
    else { return { Record }; }

  }

  //to update 
  public async update(InputDTO: IPageBannerInput): Promise<{ message: string, success: boolean }> {
    try {
      console.log("inputDTO", InputDTO)
      const { pagename } = InputDTO;
      const Record = await this.pagebannercomponent.updateOne({ "pagename": pagename }, { ...InputDTO })
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
  public async getall(): Promise<{ Record: Array<IPageBannerInput>; }> {
    try {
      const Record = await this.pagebannercomponent.find()
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