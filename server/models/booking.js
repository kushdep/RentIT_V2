import mongoose, { Schema, Types } from "mongoose";

const bookingSchema = new Schema({
    location: Types.ObjectId,
    user: {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    payment: {
        type: Types.ObjectId,
        ref: "Payment",
    },
    checkIn: {
        type: Date,
    }
}, { timestamps: true })

const Bookings = mongoose.model('Bookings', bookingSchema)
export default Bookings