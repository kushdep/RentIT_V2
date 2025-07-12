import mongoose from "mongoose"

const locSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    locDetl:{
        title:{
            type:String,
            required:true
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
    }
})

const Location = mongoose.model('Location', locSchema)
export default Location
