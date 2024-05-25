const express = require("express");
const router = express.Router();
const User = require("../controller/user_controller");

router.post("/register", User.register);
router.post("/login", User.login);
router.post("/token", User.verifyToken);
router.post("/send", User.sendVerifyEmail);
router.get("/verify", User.verifyEmail);
router.get("/", User.getAllUser);
router.get("/:id", User.getUserById);

module.exports = router;
