import Location from '../models/location.js'

export const getAllLocs = async (req, res) => {
    try {
        console.log(req.query)
        let dataReq = Number(req.query.dataReq) || 1
        if (dataReq <= 0) {
            dataReq = 1
        }
        let totalLoc = dataReq * 20
        let from = totalLoc - 19
        let to = totalLoc
        const rentLocs = await Location.find({ Sno: { $gte: from, $lte: to } })
        const locData = await Location.countDocuments()
        console.log(rentLocs)
        if (rentLocs.length === 0) {
            return res.status(204).send({
                success: false,
                totalLoc: 0,
                message: "No Rent Locations Data"
            })
        }
        return res.status(200).send({
            success: true,
            data: rentLocs,
            totalLoc: locData,
            message: 'Rent Locations Data fetched'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error
        })
    }
}