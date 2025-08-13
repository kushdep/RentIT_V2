import Location from '../models/location.js'
import User from '../models/user.js'

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


