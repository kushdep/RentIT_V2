import Location from '../models/location.js'
import { sortPlacesByDistance } from '../utils/distance.js'

export const getRentLocs = async (req, res) => {
    try {
        const { filter, sortBy } = req?.query
        if ((filter !== undefined && filter) || (sortBy !== undefined && sortBy)) {
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
        let locType = req?.query.locFltr || null
        let ratings = req?.query.ratings || false
        let guests = !isNaN(req?.query.guests) ? Number(req.query.guests) : null
        let range = !isNaN(req?.query.range) ? Number(req.query.range) : null
        let sortBy = req.query.sortBy || false
        let distance = req.query.distance || false
        let lat = req.query.lat ? Number(req.query.lat) : null
        let long = req.query.long ? Number(req.query.long) : null

        if ((dataReq === null || dataReq <= 0) &&
            (guests !== null || range !== null)) {
            dataReq = 1
        }

        let rentLocs = []
        let query = {}

        if (locType !== null && locType !== '') {
            query["locType"] = locType
        }

        if (guests !== null) {
            query["locDtl.guestsCap"] = guests
        }

        if (range !== null) {
            const priceDiff = 2000
            const from = priceDiff * (range + 1)
            if (range >= 0 && range <= 2) {
                const to = priceDiff * (range + 2)
                query["locDtl.price"] = { $gt: from, $lt: to }
            } else {
                query["locDtl.price"] = { $gt: from }
            }
        }
        let skipLoc = (dataReq - 1) * 32
        const locData = await Location.countDocuments(query)

        if (sortBy) {
            rentLocs = await Location.find(query)
            if (!ratings && distance && lat !== null && long !== null) {
                rentLocs = sortPlacesByDistance(rentLocs, lat, long)
            }

            if (ratings) {
                rentLocs.sort((a, b) => {
                    return b.stars - a.stars
                })
            }
            rentLocs = rentLocs.slice(skipLoc, skipLoc + 32)
        } else {
            rentLocs = await Location.find(query).skip(skipLoc).limit(32)
        }

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
        return res.status(400).send({
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
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}

export const getLoc = async (req, res) => {
    try {
        const { locId } = req.params
        console.log(locId)
        const loc = await Location.findById(locId)
        console.log(loc)
        if (loc) {
            return res.status(200).send({
                success: true,
                locationDetail: loc,
                message: 'Location Fetched'
            })
        } else {
            return res.status(404).send({
                success: false,
                message: 'Location Fetched'
            })

        }

    } catch (error) {
        console.log("Error in getLoc()" + error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}