import {IHeader } from '../../interfaces/MainComponent/IHeader';
import mongoose from 'mongoose';

const Header = new mongoose.Schema(
    {
        image:{ type: String }
         
})

export default mongoose.model<IHeader & mongoose.Document>('Header', Header)