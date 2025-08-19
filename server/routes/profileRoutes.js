import express from 'express'
import {imageUpload} from "../cloudinary/index.js"
import { addLocation, addReview } from '../controllers/profileController.js';
import { newLocValidation } from '../middlewares/JoiValidations/locValidation.js';
import { newReviewValidation } from '../middlewares/JoiValidations/reviewValidation.js';
const router = express.Router()

router.post('/new-loc',imageUpload , newLocValidation, addLocation)

router.post('/add-review',newReviewValidation,addReview)

export default router;