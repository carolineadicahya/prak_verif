const router = require("express").Router();
const User = require("./user_router");

router.use("/user", User);

module.exports = router;
