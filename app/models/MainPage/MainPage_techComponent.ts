import {Itec } from '../../interfaces/MainPage/MainPage_techComponent';
import mongoose from 'mongoose';

const teccomponent = new mongoose.Schema(
    {
        id:{ type: String },
        title:{ type: String },
        image:{ type: String },
        description:{ type: String },
         
})

export default mongoose.model<Itec & mongoose.Document>('MainPage_tecComponent', teccomponent)