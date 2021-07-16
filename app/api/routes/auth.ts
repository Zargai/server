import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import { IUserInput } from '../../interfaces/users/IUser';
import Auth from '../middleware/auth';
const multer = require("multer");

const route  = Router();  

export default (app:Router)=>{
    app.use('/auth', route)
    const authServiceInstance = Container.get(AuthService);

    //for sign up 
    route.post('/signup', async(req:Request, res:Response, next: NextFunction)=>{
 
    console.log(req.body);
      
        try{
            const { userRecord } = await authServiceInstance.SignUp(req.body as IUserInput);
            return res.status(201).json({userRecord})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })

    //for sigin
    route.post('/signin', async (req:Request, res:Response, next:NextFunction)=>{
        try{
            console.log('body',req.body)
        const {systemId, password} = req.body;
        const {user,token } = await authServiceInstance.SignIn(systemId, password);
        console.log("user in route",user)
        return res.json({user,token}).status(200);
                 
    }catch(e){
       
        next(e)
    }
    })

    //for deleting user
    route.delete('/delete/:systemId', async(req:Request, res:Response, next: NextFunction)=>{
        try{

            const {  success } = await authServiceInstance.deleteuser(req.params.systemId as string);
            return res.status(201).json({ success});
        }catch(e){
            console.log(e);
            return next(e)
        }
    })

    //update user
  route.post('/update',Auth, async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
      try{
           const {systemId}=req.body;
          const { message, success } = await authServiceInstance.updateuser(systemId as string, req.body as IUserInput);
          return res.status(201).json({message, success})
      }catch(e){
          console.log(e);
          return next(e)
      }
  })

  //get all users
   route.get('/all',Auth, async (req: Request, res: Response,next: NextFunction) => {
    try{
        // let location =req.body.location;
        const {userRecord} = await authServiceInstance.getusers();
        return res.json(userRecord).status(200);

    }catch(e){
        console.log(e);
          return next(e)
    }
  });

  //get single users
   route.post('/single',Auth, async (req: Request, res: Response,next: NextFunction) => {
    try{
         const {systemId}=req.body;
        const {userRecord} = await authServiceInstance.getuser(systemId as string);
        return res.json(userRecord).status(200);

    }catch(e){
        console.log(e);
          return next(e)

    }
  });

  //for image uploading defining name of image and path of image
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, 'image-'+ Date.now() + file.originalname)
    }
  })
    
  var upload = multer({ storage: storage })
//API for uploading image
     route.post('/upload', upload.single('myFile'), async (req, res, next) => {
        const file = req.file;
        if (!file) {
            const error = new Error('Please upload a file')
            console.log('no-file')
            return next(error)
          }   
          res.json({Status: 'Image Uploaded', Imagename: req.file.filename,Imagepath:"/upload/"+ req.file.filename });   
 })
}

