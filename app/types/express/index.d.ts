import { Document, Model } from 'mongoose';
import mongoose from 'mongoose'
import { IUser } from '../../interfaces/users/IUser';
import { Isafepotblogcomponent } from '../../interfaces/MainComponent/ISafepotblogcomponent';
import { ISliderComponent } from '../../interfaces/MainComponent/SliderComponent'; 
import { IKeyFeature } from '../../interfaces/MainComponent/KeyFeatureComponent'; 
import { IPageBanner } from '../../interfaces/MainComponent/PageBanner';
import { IHeader } from '../../interfaces/MainComponent/IHeader';
import { IUnit } from '../../interfaces/MainPage/MainPage_UnitsComponent';
import { IDatasecurity } from '../../interfaces/MainPage/MainPage_DatasecurityComponent';
import { IServicesPage_services } from '../../interfaces/ServicesPage/ServicesPage_servicesComponent';
import { Itec } from '../../interfaces/MainPage/MainPage_techComponent';


declare global {

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type safepotblogcomponentModel = Model<Isafepotblogcomponent & Document>;
    export type slidercomponentModel = Model<ISliderComponent & Document>;
    export type pagebannercomponentModel = Model<IPageBanner & Document>;
    export type keyfeaturecomponentModel = Model<IKeyFeature & Document>;
    export type ServicesPage_servicescomponentModel = Model<IServicesPage_services & Document>;
    export type HeadercomponentModel = Model<IHeader & Document>;
    export type UnitcomponentModel = Model<IUnit & Document>;
    export type DatasecurityModel = Model<IDatasecurity & Document>;
    export type teccomponentModel = Model<Itec & Document>;

  }
  export type ObjectId = mongoose.Schema.Types.ObjectId;
}

