import {IUser } from '../../interfaces/users/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please provide full name'],
            index: true
        },
        systemId:{
            type: String,
            unique: true,
            required: [true, 'Please provide correct Roll Number'],
            index: true
        },
        email:{
            type: String,
            index: true,
            lowecase: true
        },
        password:{
            type: String
        },
        access:{
            type: Array,
            required: false
        }
}
,{
    timestamps: true
})

export default mongoose.model<IUser & mongoose.Document>('User', User)