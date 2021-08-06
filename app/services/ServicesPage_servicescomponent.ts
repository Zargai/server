import { Service, Inject } from 'typedi';
import { IServicesPage_services,IServicesPage_servicesInput} from '../interfaces//ServicesPage/ServicesPage_servicesComponent';
import jwt from 'jsonwebtoken'

@Service()
export default class ServicesPage_servicesecomponentService {
  constructor(
    @Inject('ServicesPage_servicescomponentModel') private ServicesPage_servicescomponent: Models.ServicesPage_servicescomponentModel,
  ) { }
  //for adding data
  public async Add(InputDTO: IServicesPage_servicesInput): Promise<{ Record: IServicesPage_services }> {
    console.log("servicesbody ==>", InputDTO)
    const Record = await this.ServicesPage_servicescomponent.create({ ...InputDTO });
    if (!Record) { throw new Error('Error! Data Cannot be Stored'); }
    else { return { Record }; }

  }

  //to update 
  public async update(InputDTO: IServicesPage_servicesInput): Promise<{ message: string, success: boolean }> {
    try {
      console.log("inputDTO", InputDTO)
      const { id} = InputDTO;
      const Record = await this.ServicesPage_servicescomponent.updateOne({ "id": id }, { ...InputDTO })
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
  public async getall(): Promise<{ Record: Array<IServicesPage_servicesInput>; }> {
    try {
      const Record = await this.ServicesPage_servicescomponent.find()
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