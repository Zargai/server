import {Isafepotblogcomponent } from '../../interfaces/MainComponent/ISafepotblogcomponent';
import mongoose from 'mongoose';

const safepotblogcomponent = new mongoose.Schema(
    {
        title:{ type: String,  required: [false] },
        id:{ type: String,  required: [false] },
        card1_image:{ type: String,  required: [false] },
        card2_image:{ type: String,  required: [false] },
        card3_image:{ type: String,  required: [false] },
        card1_title:{ type: String,  required: [false] },
        card2_title:{ type: String,  required: [false] },
        card3_title:{ type: String,  required: [false] },
        card1_description:{ type: String,  required: [false] },
        card2_description:{ type: String,  required: [false] },
        card3_description:{ type: String,  required: [false] },   
}
,{
    timestamps: true
})

export default mongoose.model<Isafepotblogcomponent & mongoose.Document>('safepotblogcomponent', safepotblogcomponent)