import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IHeader, IHeaderInput } from '../../../interfaces/MainComponent/IHeader';
import Auth from '../../middleware/auth';
import HeadercomponentService from '../../../services/Header';
const multer = require("multer");

const route = Router();

export default (app: Router) => {
    app.use('/header', route)
    const HeadercomponentServiceInstance = Container.get(HeadercomponentService);

    //for adding
    route.post('/add', async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        try {
            const { Record } = await HeadercomponentServiceInstance.Add(req.body as IHeaderInput);
            return res.status(201).json({ Record })
        } catch (e) {
            console.log(e);
            return next(e)
        }
    })


    //update 
    route.post('/update', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { message, success } = await HeadercomponentServiceInstance.update(req.body as IHeaderInput);
            return res.status(201).json({ message, success })
        } catch (e) {
            console.log(e);
            return next(e)
        }
    })

      //get all data
       route.get('/all', async (req: Request, res: Response,next: NextFunction) => {
        try{
            // let location =req.body.location;
            const {Record} = await HeadercomponentServiceInstance.getall();
            return res.json(Record).status(200);

        }catch(e){
            console.log(e);
              return next(e)
        }
      });

      //for image-1 uploading defining name of image and path of image
    var storage = multer.diskStorage({
    destination: function (req, file, cb){cb(null, 'uploads')},
    filename: function(req, file, cb){ cb(null, 'header-'+  Date.now() +'-'+ file.originalname)}})

      var upload= multer({ storage: storage})

    //API for uploading image of card-1
         route.post('/upload', upload.single('image'), async (req, res, next) => {
            const file = req.file;
            console.log(file.filename)
            // console.log(req.body)
            if (!file) {
                const error = new Error('Please upload a file')
                return next(error)
              }   
              
              const body = {image:req.file.filename}
              const { message, success } = await HeadercomponentServiceInstance.update(body as IHeaderInput);
              return res.status(201).json({message, success,Status: 'Image Uploaded', 
              Imagename: req.file.filename,
              Imagepath:"/upload/"+ req.file.filename});   
     })

}

