import Location from '../models/location.js'
import User from '../models/user.js'
import Review from '../models/review.js'

export const addLocation = async (req, res) => {
    try {
        const { _id } = req.user
        const user = await User.findById({ _id })
        const author = {
            username: user.username,
            email: user.email,
        }
        const Sno = await Location.countDocuments()
        console.log(Sno)
        const newLoc = { Sno: Sno + 1, ...req.body, locDtl: { ...req.body.locDtl, author: { ...author } } }
        const locRes = await Location.create(newLoc)
        console.log(locRes)
        return res.status(201).send({
            success: true,
            message: 'Location Added Successfully',
            locId: locRes._id
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error
        })
    }
}

export const addReview = async (req, res) => {
    try {
        const { _id } = req.user
        const { locId, review, stars } = req.body
        const user = await User.findById({ _id })
        const author = {
            username: user.username,
            email: user.email,
        }
        const newReview = { location: locId, ratings: stars, review, author }
        const reviewRes = await Review.create(newReview)
        const loc = await Location.findById({ _id: locId })
        loc.locDtl.reviews.push(reviewRes._id)
        if(loc.locDtl.reviews.length>0){
            const total=loc.locDtl.reviews.reduce((prev,e)=>prev+e.ratings,0)
            loc.locDtl.ratings = total / loc.locDtl.reviews.length;  
        }
        await loc.save()
        return res.status(201).send({
            success: true,
            message: 'Review Added Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error
        })
    }
}
