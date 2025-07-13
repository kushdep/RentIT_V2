import mongoose from "mongoose"

const locSchema = new mongoose.Schema({
    locType: {
        type: String,
        required: true,
        enum: ['A01', 'V01', 'P01']
    },
    locDtl: {
        title: {
            type: String,
            required: true
        },
        images: [
            {
                title: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                filename: {
                    type: String,
                    required: true
                }
            }
        ],
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        facilities: [{
            title: {
                type: String,
                required: true,
                enum: ['Parking Faciities', 'Kitchen and dining', 'Connectivity', 'Home Safety', 'Entertainment', 'Bedroom and laundary', 'Bathroom']
            },
            ammenities: [String]
        }],
        location: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    }
}, { timestamps: { createdAt: 'createdAt' } })

const Location = mongoose.model('Location', locSchema)
export default Location
