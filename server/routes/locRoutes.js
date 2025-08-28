import express from "express";
import { getLoc, getRentLocs } from "../controllers/locController.js";
const router = express.Router()

router.get('/',getRentLocs)

router.get('/:locId',getLoc)

export default router;




