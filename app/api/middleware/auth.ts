import jwt from 'jsonwebtoken'

const Auth=(req,res,next)=>{
    //using try catch for error
    try{ 
            var header = req.headers.authorization.split(' ')[1];
             var decode = jwt.verify(header,'jwt-token');
            console.log(header)
            console.log(decode)
            next();

    }catch(error)
    {
        res.status(401).json({
            error:"Invalid Tokken"
        })
    }
}

export default Auth;