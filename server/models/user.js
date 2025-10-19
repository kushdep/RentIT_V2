import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    address: {
        type: String,
    },
    primaryPhNo: {
        type: String,
    },
    sndryPhNo: {
        type: String,
    },
    userImg: {
        url: {
            type: String,
        },
        filename: {
            type: String,
        }
    },
    locations: {
        Appartment: [{
            type: mongoose.Types.ObjectId,
            ref: 'Location'
        }],
        Villa: [{
            type: mongoose.Types.ObjectId,
            ref: 'Location'
        }],
        Penthouse: [{
            type: mongoose.Types.ObjectId,
            ref: 'Location'
        }]
    },
    savedLoc: [{
        type: mongoose.Types.ObjectId,
        ref: 'Location'
    }],
    userType: {
        propertier: {
            type: Boolean,
            default: false
        },
        idProof: {
            id: {
                type: String
            },
            refId: {
                type: Number
            },
        },
    },
    trips: [
        {
            booking: {
                type: mongoose.Types.ObjectId,
                ref: 'Bookings',
                required:true
            },
            locationDetails: {
                type: mongoose.Types.ObjectId,
                ref: 'Location',
                required:true
            },
            review: {
                type: mongoose.Types.ObjectId,
                ref: 'Review',
            }
        }
    ]
}, { timestamps: { createdAt: 'createdAt' } })


const User = mongoose.model('User', userSchema)
export default User

