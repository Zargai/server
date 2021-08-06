import {IServicesPage_services } from '../../interfaces/ServicesPage/ServicesPage_servicesComponent';
import mongoose from 'mongoose';

const ServicesPage_services = new mongoose.Schema(
    {
        title:{ type: String,  required: [false] },
        id:{ type: String,  required: [false] }, 
        image:{ type: String,  required: [false] }, 
}
,{
    timestamps: true
})

export default mongoose.model<IServicesPage_services & mongoose.Document>('ServicesPage_services', ServicesPage_services)