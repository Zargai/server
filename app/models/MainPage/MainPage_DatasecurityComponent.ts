import {IDatasecurity } from '../../interfaces/MainPage/MainPage_DatasecurityComponent';
import mongoose from 'mongoose';

const Datasecuritycomponent = new mongoose.Schema(
    {
        id:{ type: String },
        title:{ type: String },
        image:{ type: String },
        description:{ type: String },
         
})

export default mongoose.model<IDatasecurity & mongoose.Document>('MainPage_Datasecurity', Datasecuritycomponent)