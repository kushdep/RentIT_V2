import mongoose, { Schema, Types } from "mongoose";

const bookingSchema = new Schema({
    location: {
        type: Types.ObjectId,
        ref: 'Location'
    },
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
    stayDuration: {
        type: Number
    },
    totalGuests: {
        type: Number
    },
    checkIn: {
        type: Date,
    }
}, { timestamps: true })

const Bookings = mongoose.model('Bookings', bookingSchema)
export default Bookings