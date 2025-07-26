import Location from '../models/location.js'

export const addLocation = async (req, res) => {
    try {
        const newLoc = { ...req.body, locDtl: { ...req.body.locDtl, author: req.user._id } }
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


