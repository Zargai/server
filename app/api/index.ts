import { Router } from 'express';
import auth from './routes/auth';
import safepotblogcomponent from './routes/safepotblogcomponent';


// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
    safepotblogcomponent(app);
	return app
}