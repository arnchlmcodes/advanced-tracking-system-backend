import express from "express";
import { markSaleEligibleItems } from "../services/saleeligibility.services.js";

const router = express.Router();

// ⚠️ TEST ONLY – DO NOT USE IN PROD
router.post("/run-eligibility", async (req, res) => {
  await markSaleEligibleItems();
  res.json({ message: "Eligibility job executed (TEST ONLY)" });
});

export default router;
