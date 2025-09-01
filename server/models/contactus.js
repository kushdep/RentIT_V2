import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    query: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'createdAt' } })

const ContactUs = mongoose.model('ContactUs', contactUsSchema)
export default ContactUs
