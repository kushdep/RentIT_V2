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
        imgTtlData: [{
            title: {
                type: String,
                required: true
            },
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    },
                    filename: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
        ],
        price: {
            type: Number,
            required: true
        },
        guestCap: {
            type: Number,
            required: true
        },
        desc: {
            bedrooms: {
                type: Number,
                required: true
            },
            bathrooms: {
                type: Number,
                required: true
            },
            beds: {
                type: Number,
                required: true
            },
            others:{
                type:String,
                required:true
            }

        },
        facilities: [{
            id: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true,
                enum: ['Services', 'Kitchen and dining', 'Connectivity', 'Home Safety', 'Entertainment', 'Bedroom and laundary', 'Bathroom', 'Internet and office']
            },
            ammenities: [{
                id: {
                    type: Number,
                    required: true
                },
                name: String
            }]
        }],
        location: {
            address: {
                type: String,
                required: true
            },
            coordinates: {
                longitude: {
                    type: Number,
                    required: true
                },
                latitude: {
                    type: Number,
                    required: true
                }
            }
        },

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
