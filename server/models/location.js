import mongoose from "mongoose"

const locSchema = new mongoose.Schema({
    Sno:{
        type:Number,
        required:true,
        unique:true
    },
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
                }z
            ]
        }
        ],
        price: {
            type: Number,
            required: true
        },
        guestsCap: {
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
            placeId: {
                type: String,
                required: true
            },
            plusCode: {
                compound_code:{
                    type: String,
                },
                global_code:{
                    type: String,
                }
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
            email:{
                type:String,
                required:true
            },
            username:{
                type:String,
                required:true
            }
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    stars:{
        type:Number,
        default:0
    }
}, { timestamps: true })

const Location = mongoose.model('Location', locSchema)
export default Location
