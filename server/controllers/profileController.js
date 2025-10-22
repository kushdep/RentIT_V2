import Location from '../models/location.js'
import User from '../models/user.js'
import Review from '../models/review.js'
import Payment from '../models/payment.js'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import axios from 'axios'
import crypto from 'crypto'
import { getRazorpayOrderId } from '../razor-pay/razor-payment.js';
import Bookings from '../models/booking.js';
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
        const { locId, bkngId,review, stars } = req.body
        let bkngReview = await Review.find({bookingId:bkngId})
        console.log("bkngReview")
        console.log(bkngReview)
        console.log(bkngReview.length)
        if(bkngReview.length>0){
            return res.status(400).send({
                success:false,
                message:'Review Already exist'
            })
        }
        const user = await User.findById(_id)
        console.log(user)
        const author = {
            username: user.username,
            email: user.email,
        }
        const newReview = { location: locId, ratings: stars, review, author ,bookingId:bkngId}
        console.log(newReview)
        const reviewRes = await Review.create(newReview)
        console.log(reviewRes)
        const tripInd = user.trips.findIndex((t)=>t.booking.toString()===bkngId)
        if(tripInd===-1){
            return res.status(400).send({
                succes:false,
                message:'Something went wrong'
            })
        }
        user.trips[tripInd]["review"]=reviewRes._id
        console.log(user)
        await user.save() 
        const updLoc = await Location.findByIdAndUpdate({ _id: locId },{$push:{"locDtl.reviews":reviewRes._id}},{new:true})
        console.log(updLoc)
        if (updLoc.locDtl.reviews.length > 0) {
            const total = updLoc.locDtl.reviews.reduce((prev, e) => prev + e.ratings, 0)
            updLoc.stars = total / loc.locDtl.reviews.length;
        }
        await updLoc.save()
        return res.status(201).send({
            success: true,
            message: 'Review Added Successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
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
export const getUserTrips = async (req, res) => {
    try {
        const { _id } = req.user
        let result = []
        result = await User.findById({ _id }).populate([
        {
            path: "trips",
            populate:[
                {path:'booking'},
                {path:'locationDetails'},
                {path:'review'}
            ]
        }])
        console.log(result)
        if (result.length === 0) {
            return res.status(204).send({
                success: false,
                totalTrips: 0,
                message: "No Trips found"
            })
        }
        return res.status(200).send({
            success: true,
            data: result.trips,
            totalTrips: result.trips.length,
            message: "User Trips"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}
export const getUserBookings = async (req, res) => {
    try {
        const { email } = req.user
        let result = []
        result = await Bookings.find({ "user.email":email }).populate([{path:'location',select:'locDtl.title'},{path:'payment',select:'status amount'}])
        console.log(result)
        if (result.length === 0) {
            return res.status(204).send({
                success: false,
                message: "No Data found"
            })
        }
        return res.status(200).send({
            success: true,
            data: result,
            message: "User Bookings"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: error
        })
    }
}
export const getUserPaymentsInfo = async (req, res) => {
    try {
        const { _id } = req.user
        let result = []
        result = await Payment.find({ userId:_id })
        console.log(result)
        if (result.length === 0) {
            return res.status(204).send({
                success: false,
                message: "No Data found"
            })
        }
        return res.status(200).send({
            success: true,
            data: result,
            message: "User Payments"
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

        const locData = await Location.findById(locId).select("_id locDtl.title locDtl.imgTtlData locDtl.price stars")
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

        const response = await verifyPAN({ 'pan': id, 'name': name })
        console.log(response)
        if (response.success) {
            const { pan, valid, reference_id } = response.data
            if (valid) {
                let hashIdNum
                try {
                    hashIdNum = await bcrypt.hash(pan, 10)
                    const newDoc = await User.findOneAndUpdate({ _id }, {
                        '$set': {
                            'userType.propertier': true,
                            'userType.id': hashIdNum,
                            'userType.refId': reference_id
                        }
                    }, { new: true })
                    console.log(newDoc)
                    return res.status(200).send({
                        success: true,
                        message: "Verified"
                    })
                } catch (error) {
                    console.log(error)
                }

            } else {
                throw Error('Cannot Validate PAN, Check your PAN number')
            }
        } else {
            const { err_type, err_status, err_code, message } = response
            if (err_status === 400) {
                throw Error(message)
            } else {
                console.log('Error in API err_type: ' + err_type + ' err_status ' + err_status + ' err_code ' + err_code)
            }
        }
    } catch (error) {
        console.error("Error in setPropertierData() " + error)
        return res.status(400).send({
            success: false,
            status: 400,
            message: error.message
        })
    }
}

const verifyPAN = async (data) => {
    try {
        console.log(data)
        const response = await axios.post('https://sandbox.cashfree.com/verification/pan',
            data,
            {
                headers: {
                    'x-client-id': process.env.X_CLIENT_ID,
                    'x-client-secret': process.env.X_CLIENT_SECRET
                }
            }
        )
        console.log(response)
        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
                message: 'PAN verification complete'
            }
        }

    } catch (error) {
        console.log("Error in verifyPAN() " + error)
        const errs = [400, 401, 422, 429, 500, 502, 403]
        console.log(error)
        if (errs.includes(error.response.status)) {
            console.log(error.response.data)
            const { type, code, message } = error.response.data
            return {
                success: false,
                err_status: error.response.status,
                err_type: type,
                err_code: code,
                message: message
            }
        }

    }
}

function isDatesAvail(dates, oldBookedDates) {
    try {
        const { startDate, endDate } = dates
        const newStartDate = new Date(startDate).getTime()
        const newEndDate = new Date(endDate).getTime()
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newStartDate < today.getTime() || newEndDate <= today.getTime()) {
            return false
        }
        for (const oldDate of oldBookedDates) {
            const oldStartDate = new Date(oldDate.start).getTime()
            const oldEndDate = new Date(oldDate.end).getTime()
            if (newStartDate >= oldEndDate) {
                continue;
            }
            if (newStartDate < oldStartDate && (newEndDate > oldStartDate && newEndDate < oldEndDate)) {
                return false
            } else if (newStartDate > oldStartDate && newStartDate < oldEndDate) {
                return false
            } else if (newStartDate > oldStartDate && newStartDate < oldEndDate && newEndDate < oldEndDate) {
                return false
            } else if (newStartDate < oldStartDate && newEndDate > oldEndDate) {
                return false
            } else if (newStartDate === oldStartDate || newEndDate === oldEndDate) {
                return false
            }
        }
        return true
    } catch (error) {
        console.log('Error in isDatesAvail ' + error)
        return false
    }
}

export const getPaymentDetails = async (req, res) => {
    try {
        const { amount = null, locId = null, startDate = null, endDate = null, totalGuests = null, stayDuration = null } = req.body
        console.log(req.body)
        if (startDate === null || endDate === null || locId === null) {
            return res.status(500).send({
                success: false,
                status: 500,
                message: 'Bad Request'
            })
        }
        const bookedDates = await Location.findById({ _id: locId }, "bookings")
        console.log(bookedDates)
        if (bookedDates.bookings.length > 0) {
            const isAvailable = isDatesAvail({ startDate, endDate }, bookedDates.bookings)
            console.log(isAvailable)
            if (!isAvailable) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    message: 'Dates Not Available'
                })
            }
        }
        const { _id, email, username } = req.user
        const receiptNo = await Payment.countDocuments() + 1
        let status = 'PENDING'
        const razorRes = await getRazorpayOrderId(amount, receiptNo)
        if (!razorRes.success) {
            return res.status(502).send({
                success: false,
                status: 502,
                message: 'Bad Gateway'
            })
        }
        const newPayment = {
            userId: _id,
            razorpay_order_id: razorRes.id,
            amount,
            receiptNo,
            status,
        }
        const payDoc = await Payment.create(newPayment)
        if (payDoc === null) {
            return res.status(500).send({
                success: false,
                status: 500,
                message: 'Something went wrong'
            })
        }
        const newBooking = {
            location: locId,
            start: startDate,
            end: endDate,
            payment: payDoc._id,
            user: {
                email,
                username
            },
            totalGuests,
            stayDuration
        }
        const bookDoc = await Bookings.create(newBooking)
        if (bookDoc === null) {
            return res.status(500).send({
                success: false,
                status: 500,
                message: 'Unable to insert Booking Data'
            })
        }
        // const userDoc = await User.findByIdAndUpdate(_id, { $push: { trips: bookDoc._id } })
        // if (userDoc === null) {
        //     return res.status(500).send({
        //         success: false,
        //         status: 500,
        //         message: 'Unable to insert Booking Details in user'
        //     })
        // }
        console.log(process.env.RAZORPAY_ID)
        return res.status(200).send({
            success: true,
            status: 200,
            message: 'documents saved',
            data: {
                razorKey: process.env.RAZORPAY_ID,
                orderId: razorRes.id,
                paymentId: payDoc._id,
                bookingId: bookDoc._id
            }
        })

    } catch (error) {
        console.error("Error in getPaymentDetails() " + error)
        return res.status(500).send({
            success: false,
            status: 500,
            message: 'Something went wrong'
        })
    }
}

function generateStats(dates, totalRent, totalDays) {
    try {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const { startDate, endDate } = dates
        const startDateMonth = new Date(startDate).getMonth()
        const endDateMonth = new Date(endDate).getMonth()
        if (startDateMonth === endDateMonth) {
            return {
                months: [`${monthNames[startDateMonth]}`],
                revenues: [totalRent]
            }
        } else {
            const sndMnthDays = new Date(endDate).getDate() - 1
            const rent = totalRent / totalDays
            const startMonthRevenue = (totalDays - sndMnthDays) * rent
            const endMonthRevenue = sndMnthDays * rent
            return {
                months: [`${monthNames[startDateMonth]}`, `${monthNames[endDateMonth]}`],
                revenues: [startMonthRevenue, endMonthRevenue]
            }
        }
    } catch (error) {
        console.error("Error in getPaymentDetails() " + error)
        return {
            success: false
        }
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const url = req.originalUrl
                const { _id } = req.user
        if (url.includes('payment-failed')) {
            const { paymentId } = req.body
            const updPaymentDoc = await Payment.findByIdAndUpdate({ _id: paymentId }, { $set: { status: 'FAILED' } })
            if (updPaymentDoc === null) {
                return res.json({ success: false });
            }
            return res.json({ success: true });
        }
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, locId, paymentId, bookingId, startDate, endDate, totalRent, noOfDays } = req.body;
        if (razorpay_order_id === null || razorpay_payment_id === null || razorpay_signature === null || startDate === null || endDate === null || bookingId === null || paymentId === null || locId === null || totalRent === null || noOfDays === null) {
            return res.json({ success: false })
        }

        const key_secret = process.env.RAZORPAY_KEY;
        const generated_signature = crypto.createHmac("sha256", key_secret).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex")
        if (generated_signature === generated_signature) {//in test mode we do not get  razorpay_signature 

            const { months, revenues } = generateStats({ startDate, endDate }, Number(totalRent), Number(noOfDays))
            let query = {};
            months.forEach((m, i) => {
                query[`stats.${m}.totalRevenue`] = revenues[i];
                query[`stats.${m}.totalBookings`] = 1;
            });


            const locDoc = await Location.findByIdAndUpdate({ _id: locId }, { $push: { bookings: { start: startDate, end: endDate, bookingDetails: bookingId } }, $inc: query }, { new: true })
            if (locDoc === null) {
                return res.json({ success: false });
            }
            console.log(locDoc)
            const updPaymentDoc = await Payment.findByIdAndUpdate({ _id: paymentId }, { $set: { status: 'SUCCESS', razorpay_payment_id: razorpay_payment_id } }, { new: true })
            if (updPaymentDoc === null) {
                return res.json({ success: false });
            }

            // const tripData = {
            //     booking: bookingId,
            //     locationDetails: locId,
            // }

            // const userDoc = await User.findByIdAndUpdate(_id, { $push: { trips: tripData } })
            // if (userDoc === null) {
            //     return res.json({success: false})
            // }

            return res.json({ success: true });
        } else {
            const updPaymentDoc = await Payment.findByIdAndUpdate({ _id: paymentId }, { $set: { status: 'FAILED' } })
            if (updPaymentDoc === null) {
                return res.json({ success: false });
            }
            return res.json({ success: false });
        }
    } catch (error) {
        console.error("Error in verifyPayment() " + error)
        return res.json({ success: false });
    }
}