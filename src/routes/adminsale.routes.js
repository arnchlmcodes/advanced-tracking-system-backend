const express = require("express");
const { approveSale } = require("../controllers/adminsale.controller");
const { verifyUser } = require("../middlewares/authmiddleware");
const { requireAdmin } = require("../middlewares/rolemiddleware");

const router = express.Router();

router.post("/approve", verifyUser, requireAdmin, approveSale);

module.exports = router;


