import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
import { IUser, IUserInput } from '../interfaces/users/IUser';
import jwt from 'jsonwebtoken'

@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel : Models.UserModel,
  ) {}
 //for user signup
 public async SignUp(userInputDTO: IUserInput): Promise<{ userRecord: IUser}> {
  
    const {systemId} =  userInputDTO;
    const user = await this.userModel.findOne({ systemId });
  if (!user) {
                 const { name,systemId,email,password}= userInputDTO;
                 const hashedPassword = await argon2.hash(password);  
                 const userRecord = await this.userModel.create({
                   name:name,
                   systemId:systemId,
                   email:email,
                   password:hashedPassword,   
                })
                if (!userRecord) {
                  throw new Error('User cannot be created');
                }

                return { userRecord };            
            }
            else{
              throw new Error(`user with ${systemId} already exist`);
            }
       
}

  //for user signin
  public async SignIn(systemId: string, password: string): Promise<{ user: IUser,token: string  }> {
    const userRecord = await this.userModel.findOne({ systemId });
    // console.log("user record",userRecord)
    if (!userRecord) {
      throw new Error('User not registered');
    }
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {   
   
     const user = userRecord.toObject();
     const token = this.generateToken(user);
       console.log("Token generated :",token )
      return { user,token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  //for deletion user account
  public async deleteuser(systemId: string): Promise<{  success: boolean; }> {
    try {    
      const userRecord = (await this.userModel.deleteOne({ "systemId": systemId }))
      console.log('delete user', userRecord)
      if(userRecord.deletedCount == 0){
        return { success: false}
      }
      return { success: true}
    } catch (e) {
      console.log('error', e)

    }
  }

  //to update
  public async updateuser(systemId: string, userInputDTO: IUserInput): Promise<{ message:string, success: boolean }> {
    try {    
      const UserRecord = await this.userModel.updateOne({"systemId": systemId},{...userInputDTO})
      if(UserRecord.nModified <= 0){
        return {message:"No Modification", success:false}
      }
      return {message:"user Updated", success:true};
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //getallusers
  public async getusers(): Promise<{ userRecord: Array<IUser>; }> {
    try {
      const userRecord = await this.userModel.find()
      if (!userRecord) {
        throw new Error('No user found!');
      }
      console.log('****users Found***');
      console.log(userRecord);
      return { userRecord };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //get single user
  public async getuser(systemId:string): Promise<{ userRecord: IUser; }> {
    try {
      const userRecord = await this.userModel.findOne({"systemId": systemId});
      if (!userRecord) {
        throw new Error('No user found!');
      }
      console.log('****user Found****');
      console.log(userRecord);
      return { userRecord };
    } catch (e) {
     console.log(e);
      throw e;
    }
  }
  //Generating JWT Token
  private generateToken(user) {
    return  jwt.sign({ _id:user._id },'jwt-token', { expiresIn:"1h" })
  }

}