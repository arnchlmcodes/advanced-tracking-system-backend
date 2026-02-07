const express = require("express");
const { buyItem } = require("../controllers/buyersale.controller");
const { verifyUser } = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/buy", verifyUser, buyItem);

module.exports = router;

