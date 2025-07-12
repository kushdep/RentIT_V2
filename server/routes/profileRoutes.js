import express from 'express'
import { addLocation } from '../controllers/profileController.js';
import { newLocValidation } from '../middlewares/locValidation.js';
const router = express.Router()

router.post('/new-loc',newLocValidation,addLocation)

export default router;