import Location from '../models/location.js'

export const getRentLocs = async (req, res) => {
    try {
        const { filter } = req?.query
        if (filter !== undefined && filter) {
            getFilterLocs(req, res)
        } else {
            getAllLocs(req, res)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error
        })
    }
}

export const getFilterLocs = async (req, res) => {
    try {
        let dataReq = !isNaN(req?.query.dataReq) ? Number(req.query.dataReq) : null
        let guests = !isNaN(req?.query.guests) ? Number(req.query.guests) : null
        let range = !isNaN(req?.query.range) ? Number(req.query.range) : null

        if ((dataReq === null || dataReq <= 0) &&
            (guests !== null || range !== null)) {
            dataReq = 1
        }

        if (guests === null && range === null) {
            res.status(400).send({
                success: false,
                message: "Invalid filter request"
            })
        }

        let rentLocs = []
        let query = {}

        if (guests !== null) {
            query["locDtl.guestsCap"] = guests
        }

        if (range !== null) {
            const priceDiff = 2000
            const from = priceDiff * (range + 1)
            if(range>=0 && range<=2){
                const to = priceDiff * (range + 2)
                query["locDtl.price"] = { $gt: from, $lt: to }
            }else{
                query["locDtl.price"] = { $gt: from}
            }
        }
        console.log(query)
        let skipLoc = (dataReq - 1) * 32
        const locData =await Location.countDocuments(query)
        rentLocs = await Location.find(query).skip(skipLoc).limit(32)
        console.log("skipLoc "+skipLoc)
        console.log("locData "+locData)
        // console.log(rentLocs)
        if (rentLocs.length === 0) {
            return res.status(204).send({
                success: false,
                totalLoc: 0,
                message: "No Filtered Rent Locations Data"
            })
        }
        return res.status(200).send({
            success: true,
            data: rentLocs,
            totalLoc: locData,
            message: 'Filtered Rent Locations Data fetched'
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error
        })
    }
}

export const getAllLocs = async (req, res) => {
    try {
        let dataReq = isNaN(req.query.dataReq) ? 1 : Number(req.query.dataReq)
        if (dataReq <= 0) {
            dataReq = 1
        }
        let totalLoc = dataReq * 32
        let from = totalLoc - 31
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