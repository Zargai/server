import { Document, Model } from 'mongoose';
import mongoose from 'mongoose'
import { Isafepotblogcomponent } from '../../interfaces/ISafepotblogcomponent';
import { IUser } from '../../interfaces/users/IUser';


declare global {
  
  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type safepotblogcomponentModel = Model<Isafepotblogcomponent & Document>;
  }
  export type ObjectId = mongoose.Schema.Types.ObjectId;
}

