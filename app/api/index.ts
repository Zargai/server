import { Router } from 'express';
import auth from './routes/auth';
import safepotblogcomponent from './routes/MainComponent/safepotblogcomponent';
import slidercomponent from './routes/MainComponent/slidercomponent copy';
import keyfeaturecomponent from './routes/MainComponent/keyfeaturecomponent';
import pagebannercomponent from './routes/MainComponent/pagebannercomponent';
import ServicesPage_servicesecomponent from './routes/ServeicesPage/ServicesPage_servicesecomponent';
import Headercomponent from './routes/MainComponent/header';
import MainPageUnitComponent from './routes/MainPage/MainPage_UnitComponent';
import MainPageDatasecurityComponent from './routes/MainPage/MainPage_DatasecurityComponent';
import MainPagetechComponent from './routes/MainPage/MainPage_techComponent';


// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	safepotblogcomponent(app);
	slidercomponent(app);
	pagebannercomponent(app);
	keyfeaturecomponent(app);
	ServicesPage_servicesecomponent(app);
	Headercomponent(app);
	MainPageUnitComponent(app);
	MainPageDatasecurityComponent(app);
	MainPagetechComponent(app);
	
	return app
}