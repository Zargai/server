import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import safepotblogcomponentService from '../../../services/safepotblogcomponent';
import { IsafepotblogcomponentInput,Isafepotblogcomponent } from '../../../interfaces/MainComponent/ISafepotblogcomponent';
import Auth from '../../middleware/auth';
const multer = require("multer");

const route  = Router();  

export default (app:Router)=>{
    app.use('/safepotblogcomponent', route)
    const safepotblogcomponentServiceInstance = Container.get(safepotblogcomponentService);

    //for sign up 
    route.post('/add', async(req:Request, res:Response, next: NextFunction)=>{
    console.log(req.body);
      
        try{
            const { Record } = await safepotblogcomponentServiceInstance.Add(req.body as IsafepotblogcomponentInput);
            return res.status(201).json({Record})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })


    //update user
  route.post('/update', async(req:Request, res:Response, next: NextFunction)=>{
      try{
          const { message, success } = await safepotblogcomponentServiceInstance.update(req.body as IsafepotblogcomponentInput);
          return res.status(201).json({message, success})
      }catch(e){
          console.log(e);
          return next(e)
      }
  })

  //get all data
   route.get('/all', async (req: Request, res: Response,next: NextFunction) => {
    try{
        // let location =req.body.location;
        const {Record} = await safepotblogcomponentServiceInstance.getall();
        return res.json(Record).status(200);

    }catch(e){
        console.log(e);
          return next(e)
    }
  });

  //for image-1 uploading defining name of image and path of image
var storage = multer.diskStorage({
destination: function (req, file, cb){cb(null, 'uploads/safepotblogcomponent')},
filename: function(req, file, cb){ cb(null, 'image-card-'+  Date.now() +'-'+ file.originalname)}})
    
  var upload= multer({ storage: storage })

//API for uploading image of card-1
     route.post('/upload/card1-image', upload.single('image'), async (req, res, next) => {
        const file = req.file;
        if (!file) {
            const error = new Error('Please upload a file')
            return next(error)
          }   
          const body = {card1_image:req.file.filename}
          const { message, success } = await safepotblogcomponentServiceInstance.update(body as IsafepotblogcomponentInput);
          return res.status(201).json({message, success,Status: 'Image Uploaded', 
          Imagename: req.file.filename,
          Imagepath:"/upload/"+ req.file.filename});   
 })
//API for uploading image of card-2
     route.post('/upload/card2-image', upload.single('image') , async (req, res, next) => {
         console.log("file===>",req.file)
        const file = req.file;
        if (!file) {
            const error = new Error('Please upload a file')
            return next(error)
          }   
          const body = {card2_image:req.file.filename}
          const { message, success } = await safepotblogcomponentServiceInstance.update(body as IsafepotblogcomponentInput);
          return res.status(201).json({message, success,Status: 'Image Uploaded', 
          Imagename: req.file.filename,
          Imagepath:"/upload/"+ req.file.filename});   
 })
//API for uploading image of card-1
     route.post('/upload/card3-image', upload.single('image'), async (req, res, next) => {
        const file = req.file;
        if (!file) {
            const error = new Error('Please upload a file')
            return next(error)
          }     
          const body = {card3_image:req.file.filename}
          const { message, success } = await safepotblogcomponentServiceInstance.update(body as IsafepotblogcomponentInput);
          return res.status(201).json({message, success,Status: 'Image Uploaded', 
          Imagename: req.file.filename,
          Imagepath:"/upload/"+ req.file.filename});   
 })
}

