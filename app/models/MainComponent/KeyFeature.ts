import {IKeyFeature } from '../../interfaces/MainComponent/KeyFeatureComponent';
import mongoose from 'mongoose';

const KeyFeature = new mongoose.Schema(
    {
        id:{ type: String },
        title:{ type: String },
        image:{ type: String },
        description:{ type: String },
         
})

export default mongoose.model<IKeyFeature & mongoose.Document>('KeyFeature', KeyFeature)