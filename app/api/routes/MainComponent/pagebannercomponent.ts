import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { IPageBanner, IPageBannerInput } from '../../../interfaces/MainComponent/PageBanner';
import Auth from '../../middleware/auth';
import pagebannercomponentService from '../../../services/PageBannerComponent';
const multer = require("multer");

const route = Router();

export default (app: Router) => {
    app.use('/pagebanner', route)
    const pagebannercomponentServiceInstance = Container.get(pagebannercomponentService);

    //for adding
    route.post('/add', async (req: Request, res: Response, next: NextFunction) => {
        console.log(req);
     
        try {
            // const { Record } = await pagebannercomponentServiceInstance.Add(req.body as IPageBannerInput);
            console.log(req.body)
            return res.status(201).json({ record:"Record" })
        } catch (e) {
            console.log(e);
            return next(e)
        }
    })


    //update 
    route.post('/update', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { message, success } = await pagebannercomponentServiceInstance.update(req.body as IPageBannerInput);
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
            const {Record} = await pagebannercomponentServiceInstance.getall();
            return res.json(Record).status(200);

        }catch(e){
            console.log(e);
              return next(e)
        }
      });

      //for image-1 uploading defining name of image and path of image
    var storage = multer.diskStorage({
    destination: function (req, file, cb){cb(null, 'uploads/pagebanner')},
    filename: function(req, file, cb){ cb(null, 'image-'+  Date.now() +'-'+ file.originalname)}})

      var upload= multer({ storage: storage})

    //API for uploading image of 

         route.post('/upload', upload.array('image'), async (req, res, next) => {
            const file = req.file;
            // console.log(req.body)
            if (!file) {
                const error = new Error('Please upload a file')
                return next(error)
              }   
              console.log("Body==>",req.body)
              const body = {image:req.file.filename,pagename:req.body.pagename}
              const { message, success } = await pagebannercomponentServiceInstance.update(body as IPageBannerInput);
              return res.status(201).json({message, success,Status: 'Image Uploaded', 
              Imagename: req.file.filename,
              Imagepath:"/upload/"+ req.file.filename});   
     })
    // //API for uploading image of card-1

    //      route.post('/uploads', upload.single('img'), async (req, res, next) => {
    //         const file = req.file;
    //         console.log("req id",req.params.id)
    //         // console.log(req.body)
    //         if (!file) {
    //             const error = new Error('Please upload a file')
    //             return next(error)
    //           }   
    //           const body = {image:req.file.filename,pagename:"aboutus"}
    //          const { message, success } = await pagebannercomponentServiceInstance.imageupload(body as IPageBannerInput);
    //          return res.status(201).json({message, success,Status: 'Image Uploaded', 
    //           Imagename: req.file.filename,
    //           Imagepath:"/upload/"+ req.file.filename}); 
 
    //  })
    //  ///image Uploading Apiiiii(Completed working)
    //      route.post('/uploadimg', upload.single('img'), async (req, res, next) => {
    //         const file = req.file;
    //         if (!file) {
    //             const error = new Error('Please upload a file')
    //             return next(error)
    //           }   
    //         return res.status(201).json({Image:req.file.filename })
    //         })
    //  ///image Uploading Apiiiii(Completed working)
    //      route.post('/uploadimg', upload.array('img',8), async (req, res, next) => {
    //         const file = req.file;
    //         if (!file) {
    //             const error = new Error('Please upload a file')
    //             return next(error)
    //           }   
    //         return res.status(201).json({Image:req.file.filename })
    //         })
        
}

