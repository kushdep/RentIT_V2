import Location from '../models/location.js'

export const addLocation = async (req, res) => {
    try {
        console.log(req.files)
        const imageURLs = req.files.map(f => ({ url: f.path, filename: f.filename }))
        const newLoc = { ...req.body, locDtl: { ...req.body.locDtl, images: imageURLs, author: req.user._id } }
        const locRes = await Location.create(newLoc)
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


