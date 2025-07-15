import express from 'express'
import multer from 'multer'
import { storage } from '../cloudinary/index.js'
import { addLocation } from '../controllers/profileController.js';
import { newLocValidation } from '../middlewares/JoiValidations/locValidation.js';
const router = express.Router()
const upload = multer({ storage })

router.post('/new-loc', upload.array('images'), newLocValidation, addLocation)

export default router;