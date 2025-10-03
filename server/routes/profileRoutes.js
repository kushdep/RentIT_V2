import express from 'express'
import { imageUpload, profileImgUpload } from "../cloudinary/index.js"
import { addLocation, addReview, getPaymentDetails, getProfileData, getUserBookings, getUserPaymentsInfo, getUserTrips, getWhishlistLoc, setProfileData, setPropertierData, updateProfileImg, updateSavedLoc, verifyPayment } from '../controllers/profileController.js';
import { newLocValidation } from '../middlewares/JoiValidations/locValidation.js';
import { newReviewValidation } from '../middlewares/JoiValidations/reviewValidation.js';
const router = express.Router()

router.post('/new-loc', imageUpload, newLocValidation, addLocation)

router.post('/add-review', newReviewValidation, addReview)

router.get('/my-trips', getUserTrips)

router.get('/my-bookings', getUserBookings)

router.get('/payments-info', getUserPaymentsInfo)

router.get('/liked-loc', getWhishlistLoc)

router.patch('/update-liked-loc', updateSavedLoc)

router.patch('/update-profile-img',profileImgUpload,updateProfileImg)

router.patch('/propertier-verification',setPropertierData)


router.route("")
    .get(getProfileData)
    .patch(setProfileData)

router.post("/payment",getPaymentDetails)

router.post("/payment-success",verifyPayment)

router.post("/payment-failed",verifyPayment)

export default router;