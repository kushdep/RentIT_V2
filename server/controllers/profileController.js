import Location from '../models/location.js'
import User from '../models/user.js'
import Review from '../models/review.js'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

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
        return res.status(400).send({
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
        if (loc.locDtl.reviews.length > 0) {
            const total = loc.locDtl.reviews.reduce((prev, e) => prev + e.ratings, 0)
            loc.stars = total / loc.locDtl.reviews.length;
        }
        await loc.save()
        return res.status(201).send({
            success: true,
            message: 'Review Added Successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}

export const getWhishlistLoc = async (req, res) => {
    try {
        const { _id } = req.user
        let result = []
        result = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(_id) } },
            {
                $lookup: {
                    from: "locations",
                    localField: "savedLoc",
                    foreignField: "_id",
                    as: "savedLoc"
                }
            },
            { $unwind: "$savedLoc" },
            {
                $project: {
                    _id: 0,
                    locId: "$savedLoc._id",
                    name: "$savedLoc.locDtl.title",
                    coverImg: { $arrayElemAt: ["$savedLoc.locDtl.imgTtlData.images.url", 0] },
                    price: "$savedLoc.locDtl.price",
                    ratings: "$savedLoc.stars",
                    isSaved: { $literal: true }
                }
            }
        ]);
        console.log(result)
        if (result.length === 0) {
            return res.status(204).send({
                success: false,
                totalLocs: 0,
                message: "No Filtered Rent Locations Data"
            })
        }
        return res.status(200).send({
            success: true,
            data: result,
            totalLocs: result.length,
            message: "User Whishlist Location"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}


export const updateSavedLoc = async (req, res) => {
    try {
        const { _id } = req.user
        console.log(req.user)
        console.log(req.body)
        const { locId = null, likeStts } = req.body
        if (locId === null || likeStts === undefined || likeStts === null) {
            return res.status(400).send({
                success: false,
                message: "Please Send Location Data to Updata"
            })
        }
        let query = {}
        if (likeStts) {
            query["$addToSet"] = { savedLoc: locId }
        } else {
            query["$pull"] = { savedLoc: locId }
        }
        const updatedDoc = await User.findOneAndUpdate({ _id }, query)
        console.log(updatedDoc)
        console.log(query)

        const locData = await Location.findById(locId).select("_id locDtl.title locDtl.imgTtlData locDtl.price stars")
        console.log("Location Data")
        console.log(locData)

        if (updatedDoc !== null) {
            let data = {}
            if (likeStts) {
                data = {
                    locDetails: {
                        locId: locData._id,
                        name: locData.locDtl.title,
                        coverImg: locData.locDtl.imgTtlData[0].images.url,
                        price: locData.locDtl.price,
                        ratings: locData.stars,
                        isSaved: likeStts
                    },
                    status: likeStts
                }
                return res.status(200).send({
                    success: true,
                    data: data,
                    message: "Added to Whishlist"
                })
            } else {
                data = { locDetails: { locId: locData._id, status: likeStts } }
                return res.status(200).send({
                    success: true,
                    data: data,
                    message: "Removed from Whishlist"
                })
            }
        } else {
            return res.status(409).send({
                success: false,
                message: "Can't Update there is Some Error"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}


export const getProfileData = async (req, res) => {
    try {
        const { _id } = req.user
        const userData = await User.findById(_id)
        if (userData) {
            return res.status(200).send({
                success: true,
                user: userData,
            })
        } else {
            return res.status(403).send({
                success: false,
            })
        }
    } catch (error) {
        console.log("Error in getProfileData" + error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}

export const setProfileData = async (req, res) => {
    try {
        const { _id } = req.user
        const { username = null, address = null, contactNo = null, othContactNo = null } = req.body
        console.log(req.body)
        let val = {}
        if (username !== null && username !== '') {
            val['username'] = username
        }

        if (address !== null) {
            val['address'] = address
        }

        if (othContactNo !== null) {
            val['primaryPhNo'] = contactNo
        }

        if (othContactNo !== null) {
            val['sndryPhNo'] = othContactNo
        }

        console.log(val)

        const updatedUser = await User.findByIdAndUpdate({ _id }, { '$set': val }, { new: true })
        console.log(updatedUser)

        if (updatedUser) {
            return res.status(200).send({
                success: true,
                user: updatedUser
            })
        } else {
            return res.status(403).send({
                success: false,
                message: 'User cannot be updated'
            })
        }

    } catch (error) {
        console.error("Error in setPtofileData " + error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}


export const updateProfileImg = async (req, res) => {
    try {
        const { profileImage = null } = req.body
        const { _id } = req.user
        if (profileImage !== null) {
            const updatedUser = await User.findByIdAndUpdate(_id, { '$set': { userImg: profileImage } }, { new: true })
            if (updatedUser) {
                return res.status(200).send({
                    success: true,
                    url: updatedUser.userImg.url
                })
            } else {
                return res.status(403).send({
                    success: false,
                    message: 'Profile Image cannot be updated'
                })
            }
        }

    } catch (error) {
        console.error("Error in setPtofileData " + error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}

export const setPropertierData = async (req, res) => {
    try {
        const { id = '', name = null } = req.body
        const { _id } = req.user

        if (id.length === 10 || name === null) {
            const regex = /^[A-Z]{4}[0-9]{4}[A-Z]$/
            const result = regex.test("ABCD1234X")
            if (!result) {
                throw Error('Invalid PAN Number')
            }
        } else {
            throw Error('Invalid Credentials')
        }

        const response = verifyPAN({ 'pan': id, 'name': name })
        if (response.status) {
            const { pan, valid, message, reference_id } = response.data
            if (valid) {
                let hashIdNum
                try {
                    hashIdNum = await bcrypt.hash(password, 10)
                    const newDoc = await User.findOneAndUpdate({ _id }, {
                        '$set': {
                            'userType.propertier': true,
                            'userType.id': hashIdNum,
                            'userType.refId': reference_id
                        }
                    }, { new: true })
                    console.log(newDoc)
                    return res.status(200).send({
                        success:true,
                        message:"Verified"
                    })
                } catch (error) {
                    console.log(error)
                }

            } else {
                throw Error(message)
            }
        } else {
            const { err_type, err_status, err_code, message } = response
            if (err_status === 400) {
                throw Error(message)
            } else {
                console.log('Error in API err_type: '+err_type+' err_status '+err_status+' err_code '+err_code)
            }
        }
    } catch (error) {
        console.error("Error in setPropertierData() " + error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}

const verifyPAN = async (data) => {
    try {
        const response = await axios.post('https://sandbox.cashfree.com/verification/pan', {
            data,
            headers: {
                'x-client-id': process.env.CLIENT_ID,
                'x-client-secret': process.env.CLIENT_SECRET
            }
        })
        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
                message: 'PAN verified successfully'
            }
        }
        const errs = [400, 401, 422, 429, 500, 502]
        if (errs.includes(response.status)) {
            const { type, code, message } = response.error
            return {
                success: false,
                err_status: response.status,
                err_type: type,
                err_code: code,
                message: message
            }
        }

    } catch (error) {
        console.log("Error in verifyPAN() " + error)
    }
}

