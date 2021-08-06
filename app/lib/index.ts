import expressLoader from './express';
import mongooseLoader from './mongoose';
import injector from './injector'

export default async ({ expressApp }) => {

  const mongoConnection = await mongooseLoader()
 
  const userModel =
   {  name: 'userModel',   model: require('../models/Users/user').default, };
  const TechcomponentModel =
   {  name: 'TechcomponentModel',   model: require('../models/MainPage/MainPage_techComponent').default, };
 
  const DatasecurityModel =
   {  name: 'DatasecurityModel',   model: require('../models/MainPage/MainPage_DatasecurityComponent').default, };
  const UnitcomponentModel =
   {  name: 'UnitcomponentModel',   model: require('../models/MainPage/MainPage_UnitsComponent').default, };
  const HeaderModel =
   {  name: 'headercomponentModel',   model: require('../models/MainComponent/Header').default, };
  const safepotblogcomponentModel =
   {  name: 'safepotblogcomponentModel',   model: require('../models/MainComponent/safepotblogcomponent').default, };
  const slidercomponentModel =
   {  name: 'slidercomponentModel',   model: require('../models/MainComponent/SliderComponent').default, };
  const pagebannercomponentModel =
   {  name: 'pagebannercomponentModel',   model: require('../models/MainComponent/PageBanner').default, };
  const keyfeaturecomponentModel =
   {  name: 'keyfeaturecomponentModel',   model: require('../models/MainComponent/KeyFeature').default, };
  const ServicesPage_servicesModel =
   {  name: 'ServicesPage_servicescomponentModel',   model: require('../models/ServicesPage/ServicesPage_services').default, };

  const { agenda } = await injector({
    mongoConnection,
    models: [
      userModel, safepotblogcomponentModel,slidercomponentModel,pagebannercomponentModel,keyfeaturecomponentModel,
      ServicesPage_servicesModel,HeaderModel,UnitcomponentModel,DatasecurityModel,TechcomponentModel
        ]  
  });

    await expressLoader({ app: expressApp });
    console.log('Express ready to go!!');
  
  };