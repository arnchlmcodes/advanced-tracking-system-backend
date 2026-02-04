import express from "express";
import { approveSale } from "../controllers/adminsale.controller.js";
import { verifyUser } from "../middlewares/authmiddleware.js";
import { requireAdmin } from "../middlewares/rolemiddleware.js";

const router = express.Router();

router.post("/approve", verifyUser, requireAdmin, approveSale);

export default router;

