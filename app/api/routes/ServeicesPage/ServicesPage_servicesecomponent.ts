import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IServicesPage_servicesInput, IServicesPage_services } from '../../../interfaces//ServicesPage/ServicesPage_servicesComponent';
import Auth from '../../middleware/auth';
import ServicesPage_servicesecomponentService from '../../../services/ServicesPage_servicescomponent';
const multer = require("multer");

const route = Router();

export default (app: Router) => {
    app.use('/ServicesPage_services', route)
    const ServicesPage_servicesecomponentServiceInstance = Container.get(ServicesPage_servicesecomponentService);

    //for adding
    route.post('/add', async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        try {
            const { Record } = await ServicesPage_servicesecomponentServiceInstance.Add(req.body as IServicesPage_servicesInput);
            return res.status(201).json({ Record })
        } catch (e) {
            console.log(e);
            return next(e)
        }
    })


    //update 
    route.post('/update', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { message, success } = await ServicesPage_servicesecomponentServiceInstance.update(req.body as IServicesPage_servicesInput);
            return res.status(201).json({ message, success })
        } catch (e) {
            console.log(e);
            return next(e)
        }
    })

    //get all data
    route.get('/all', async (req: Request, res: Response, next: NextFunction) => {
        try {
            // let location =req.body.location;
            const { Record } = await ServicesPage_servicesecomponentServiceInstance.getall();
            return res.json(Record).status(200);

        } catch (e) {
            console.log(e);
            return next(e)
        }
    });

    //for image-1 uploading defining name of image and path of image
    var storage = multer.diskStorage({
        destination: function (req, file, cb) { cb(null, 'uploads/ServicesPage') },
        filename: function (req, file, cb) { cb(null, 'image-' + Date.now() + '-' + file.originalname) }
    })

    var upload = multer({ storage: storage })

    //API for uploading image of card-1
    route.post('/upload', upload.single('image'), async (req, res, next) => {
        const file = req.file;
        // console.log(req.body)
        if (!file) {
            const error = new Error('Please upload a file')
            return next(error)
        }

        const body = { image: req.file.filename, id: req.body.name }
        const { message, success } = await ServicesPage_servicesecomponentServiceInstance.update(body as IKeyFeatureInput);
        return res.status(201).json({
            message, success, Status: 'Image Uploaded',
            Imagename: req.file.filename,
            Imagepath: "/upload/" + req.file.filename
        });
    })

}

