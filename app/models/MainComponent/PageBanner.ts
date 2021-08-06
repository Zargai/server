import {IPageBanner } from '../../interfaces/MainComponent/PageBanner';
import mongoose from 'mongoose';

const PageBanner = new mongoose.Schema(
    {
        pagename:{ type: String },
        title:{ type: String },
        image:{ type: String },
        description1:{ type: String },
        description2:{ type: String },
         
})

export default mongoose.model<IPageBanner & mongoose.Document>('PageBanner', PageBanner)