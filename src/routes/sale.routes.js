const express = require("express");
const { buyItem } = require("../controllers/buyersale.controller");
const authenticate = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/buy", authenticate, buyItem);

module.exports = router;
