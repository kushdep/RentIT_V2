import express from "express";
import { getRentLocs } from "../controllers/locController.js";
const router = express.Router()

router.get('/',getRentLocs)

export default router;




