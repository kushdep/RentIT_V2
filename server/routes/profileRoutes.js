import express from 'express'
import {imageUpload} from "../cloudinary/index.js"
import { addLocation } from '../controllers/profileController.js';
import { newLocValidation } from '../middlewares/JoiValidations/locValidation.js';
const router = express.Router()

router.post('/new-loc',imageUpload , newLocValidation, addLocation)

export default router;