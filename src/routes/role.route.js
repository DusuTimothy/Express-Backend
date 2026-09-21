const express = require("express");
const router = express.Router();

const { adminDashboard, userDashboard } = require("../controllers/admin&userDashboard");
const authenticate = require("../middleware/authentication");
const { authorize } = require("../middleware/authorization");

router.get("/admin", authenticate, authorize("admin"), adminDashboard);
router.get("/user", authenticate, userDashboard);

module.exports = router;
