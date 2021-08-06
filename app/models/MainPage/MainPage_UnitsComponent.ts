import {IUnit } from '../../interfaces/MainPage/MainPage_UnitsComponent';
import mongoose from 'mongoose';

const Unitcomponent = new mongoose.Schema(
    {
        id:{ type: String },
        title:{ type: String },
        image:{ type: String },
        description:{ type: String },
         
})

export default mongoose.model<IUnit & mongoose.Document>('MainPage_UnitComponent', Unitcomponent)