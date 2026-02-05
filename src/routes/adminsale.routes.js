const express = require("express");
const { approveSale } = require("../controllers/adminsale.controller");
const authenticate = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/approve", authenticate, authorize('admin'), approveSale);

module.exports = router;

