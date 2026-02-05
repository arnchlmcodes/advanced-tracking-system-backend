import express from "express";
import { buyItem } from "../controllers/buyersale.controller.js";
import { verifyUser } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/buy", verifyUser, buyItem);

export default router;
