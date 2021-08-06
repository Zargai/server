import {ISliderComponent } from '../../interfaces/MainComponent/SliderComponent';
import mongoose from 'mongoose';

const slidercomponent = new mongoose.Schema(
    {
        pagename:{ type: String },
        title:{ type: String },
        image:{ type: String },
        description:{ type: String },
})

export default mongoose.model<ISliderComponent & mongoose.Document>('slidercomponent', slidercomponent)