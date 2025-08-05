import express from "express";
import { getAllLocs } from "../controllers/locController.js";
const router = express.Router()

router.get('/',getAllLocs)

export default router;




