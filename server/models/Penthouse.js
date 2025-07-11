import mongoose from "mongoose"

const PenthouseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [
        {
            title: String,
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
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
})

const Penthouse = mongoose.model('Penthouse', PenthouseSchema)
export default Penthouse