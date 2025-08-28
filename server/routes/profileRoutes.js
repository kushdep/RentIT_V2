import express from 'express'
import { imageUpload } from "../cloudinary/index.js"
import { addLocation, addReview, getProfileData, getWhishlistLoc, setProfileData, updateSavedLoc } from '../controllers/profileController.js';
import { newLocValidation } from '../middlewares/JoiValidations/locValidation.js';
import { newReviewValidation } from '../middlewares/JoiValidations/reviewValidation.js';
const router = express.Router()

router.post('/new-loc', imageUpload, newLocValidation, addLocation)

router.post('/add-review', newReviewValidation, addReview)

router.get('/liked-loc', getWhishlistLoc)

router.patch('/update-liked-loc', updateSavedLoc)

router.route("")
    .get(getProfileData)
    .patch(setProfileData)

export default router;